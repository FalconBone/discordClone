const path = require('path')

const resolvePath = (p : string) => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@app': resolvePath('./src/app'),
            '@pages': resolvePath('./src/pages'),
            '@services': resolvePath('./src/services'),
            '@src': resolvePath('./src')
        }
    },
}

export {}