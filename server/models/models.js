const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db')

// Пользователи
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'offline' }
}, {
    indexes: [{ fields: ['username', 'email'] }]
});

// Серверы
const Server = sequelize.define('Server', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    owner_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

// Участники сервера
const ServerMember = sequelize.define('ServerMember', {
    server_id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'member' },
    joined_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

// Каналы
const Channel = sequelize.define('Channel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    server_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

// Сообщения
const Message = sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    channel_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'text' },
    content: { type: DataTypes.TEXT, allowNull: true },
    timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

// Друзья
const Friend = sequelize.define('Friend', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    friend_id: { type: DataTypes.INTEGER, primaryKey: true },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

// Прямые сообщения
const DirectMessage = sequelize.define('DirectMessage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sender_id: { type: DataTypes.INTEGER, allowNull: false },
    receiver_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'text' },
    content: { type: DataTypes.TEXT, allowNull: true },
    timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

// Роли
const Role = sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    server_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    permissions: { type: DataTypes.TEXT, allowNull: false }
});

// Ассоциации
User.hasMany(Server, { foreignKey: 'owner_id' });
Server.belongsTo(User, { foreignKey: 'owner_id' });

Server.hasMany(ServerMember, { foreignKey: 'server_id' });
ServerMember.belongsTo(Server, { foreignKey: 'server_id' });
User.hasMany(ServerMember, { foreignKey: 'user_id' });
ServerMember.belongsTo(User, { foreignKey: 'user_id' });

Server.hasMany(Channel, { foreignKey: 'server_id' });
Channel.belongsTo(Server, { foreignKey: 'server_id' });

Channel.hasMany(Message, { foreignKey: 'channel_id' });
Message.belongsTo(Channel, { foreignKey: 'channel_id' });
User.hasMany(Message, { foreignKey: 'user_id' });
Message.belongsTo(User, { foreignKey: 'user_id' });

User.belongsToMany(User, { through: Friend, as: 'Friends', foreignKey: 'user_id', otherKey: 'friend_id' });

User.hasMany(DirectMessage, { foreignKey: 'sender_id' });
DirectMessage.belongsTo(User, { foreignKey: 'sender_id' });
User.hasMany(DirectMessage, { foreignKey: 'receiver_id' });
DirectMessage.belongsTo(User, { foreignKey: 'receiver_id' });

Server.hasMany(Role, { foreignKey: 'server_id' });
Role.belongsTo(Server, { foreignKey: 'server_id' });

module.exports = {
    User,
    Server,
    ServerMember,
    Channel,
    Message,
    Friend,
    DirectMessage,
    Role
};
