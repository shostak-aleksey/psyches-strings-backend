const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../controllers/authController');
const RefreshToken = require('../models/RefreshToken');

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Не указан email или пароль'));
    }
    try {
      const candidate = await User.findOne({ email });
      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким email уже существует'),
        );
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });

      // Use the correct function calls
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      return res.json({ accessToken });
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 11000) {
        return next(
          ApiError.badRequest('Пользователь с таким email уже существует'),
        );
      }
      return next(ApiError.internal('Ошибка сервера'));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    console.log(`Attempting login for email: ${email}`);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return next(ApiError.internal('Пользователь не найден'));
    }

    console.log(`Stored hashed password: ${user.password}`);
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      console.log('Password comparison failed');
      return next(ApiError.internal('Указанный пароль неверен'));
    }

    // Use the correct function calls
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

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

  async check(req, res) {
    const token = generateAccessToken(
      req.user.id,
      req.user.email,
      req.user.role,
    );
    return res.json({ token });
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
