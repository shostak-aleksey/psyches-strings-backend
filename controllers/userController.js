const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../modules/modules');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

class UserController {
  async googleCallback(req, res, next) {
    try {
      const accessToken = generateAccessToken(
        req.user.id,
        req.user.email,
        req.user.role,
      );
      const refreshToken = generateRefreshToken(
        req.user.id,
        req.user.email,
        req.user.role,
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      return res.json({ accessToken, refreshToken });
    } catch (error) {
      return next(ApiError.internal('Ошибка при обработке Google OAuth'));
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указанный пароль неверен'));
    }
    const accessToken = generateAccessToken(user.id, user.email, user.role);
    const refreshToken = generateRefreshToken(user.id, user.email, user.role);
    await RefreshToken.create({ token: refreshToken, userId: user.id });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.json({ accessToken });
  }

  async refresh(req, res, next) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(ApiError.badRequest('Refresh token отсутствует'));
    }
    let userData;
    try {
      userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    } catch (e) {
      return next(ApiError.unauthorized('Неверный refresh token'));
    }
    const tokenInDb = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!tokenInDb) {
      return next(
        ApiError.unauthorized('Refresh token не найден в базе данных'),
      );
    }
    const accessToken = generateAccessToken(
      userData.id,
      userData.email,
      userData.role,
    );
    const newRefreshToken = generateRefreshToken(
      userData.id,
      userData.email,
      userData.role,
    );
    await RefreshToken.create({ token: newRefreshToken, userId: userData.id });
    await tokenInDb.destroy();

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.json({ accessToken });
  }

  async logout(req, res, next) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(ApiError.badRequest('Refresh token отсутствует'));
    }
    const tokenInDb = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (tokenInDb) {
      await tokenInDb.destroy();
    }

    res.clearCookie('refreshToken');

    return res.json({ message: 'Вы успешно вышли из системы' });
  }

  async check(req, res) {
    const token = generateAccessToken(
      req.user.id,
      req.user.email,
      req.user.role,
    );
    return res.json({ token });
  }

  async getAll(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return next(
        ApiError.internal('Ошибка при получении списка пользователей'),
      );
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }
      return res.json(user);
    } catch (e) {
      return next(ApiError.internal('Ошибка при получении пользователя'));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { email, role } = req.body;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }
      user.email = email || user.email;
      user.role = role || user.role;
      await user.save();
      return res.json(user);
    } catch (e) {
      return next(ApiError.internal('Ошибка при обновлении пользователя'));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }
      await user.destroy();
      return res.json({ message: 'Пользователь удален' });
    } catch (e) {
      return next(ApiError.internal('Ошибка при удалении пользователя'));
    }
  }
}

module.exports = new UserController();
