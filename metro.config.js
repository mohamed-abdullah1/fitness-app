// const {getDefaultConfig } = require("metro-config");
// module.exports= (async()=>{
// const defaultConfig = await getDefaultConfig();
// const {assetExts} = defaultConfig.resolver;
// return {
//     resolver :{
//         assetExts:[...assetExts,'bin']
//     }
// }
// });

const { getDefaultConfig } = require("metro-config");
module.exports = async () => {
    const defaultConfig = await getDefaultConfig();
    const { assetExts } = defaultConfig.resolver;
    return {
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: false,
                },
            }),
        },
        resolver: {
            assetExts: ["bin", "txt", "jpg", "png", "ttf"],
            sourceExts: ["js", "json", "ts", "tsx", "jsx"],
        },
    };
};
