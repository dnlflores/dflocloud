'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, profilePicUrl } = this; // context will be the User instance
      return { id, username, email, profilePicUrl };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password, profilePicture }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        profilePicUrl: profilePicture
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      User.hasMany(models.Song, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
      User.hasMany(models.Album, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
      User.hasMany(models.Comment, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
      User.hasMany(models.Playlist, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      profilePicUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};

// 'use strict';
// const bcrypt = require('bcryptjs');
// const { Validator } = require('sequelize');
// const { singlePublicFileUpload } = require('../../awsS3');

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [3, 30],
//         isNotEmail(value) {
//           if (Validator.isEmail(value)) {
//             throw new Error('Cannot be an email.');
//           }
//         }
//       }
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [3, 256]
//       }
//     },
//     hashedPassword: {
//       type: DataTypes.STRING.BINARY,
//       allowNull: false,
//       validate: {
//         len: [60, 60]
//       }
//     },
//     profilePicUrl: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   },
//     {
//       defaultScope: {
//         attributes: {
//           exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
//         }
//       },
//       scopes: {
//         currentUser: {
//           attributes: { exclude: ['hashedPassword', 'createdAt', 'updatedAt'] }
//         },
//         loginUser: {
//           attributes: {}
//         }
//       }
//     });

//   User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
//     const { id, username, email, profilePicUrl } = this; // context will be the User instance
//     return { id, username, email, profilePicUrl };
//   };

//   User.prototype.validatePassword = function (password) {
//     return bcrypt.compareSync(password, this.hashedPassword.toString());
//   };

//   User.getCurrentUserById = async function (id) {
//     return await User.scope('currentUser').findByPk(id);
//   };

//   User.login = async function ({ credential, password }) {
//     const { Op } = require('sequelize');
//     const user = await User.scope('loginUser').findOne({
//       where: {
//         [Op.or]: {
//           username: credential,
//           email: credential
//         }
//       }
//     });
//     if (user && user.validatePassword(password)) {
//       return await User.scope('currentUser').findByPk(user.id);
//     }
//   };

//   User.signup = async function ({ username, email, password, profilePicture }) {
//     const hashedPassword = bcrypt.hashSync(password);
//     const user = await User.create({
//       username,
//       email,
//       hashedPassword,
//       profilePicUrl: profilePicture
//     });
//     return await User.scope('currentUser').findByPk(user.id);
//   };

//   User.associate = function (models) {
//     User.hasMany(models.Song, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
//     User.hasMany(models.Album, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
//     User.hasMany(models.Comment, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
//     User.hasMany(models.Playlist, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
//   };

//   return User;
// };