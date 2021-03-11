const {
    DOC_MAX_SIZE,
    DOCS_MIMETYPES,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES,
    VIDEO_MAX_SIZE,
    VIDEOS_MIMETYPES
} = require('../constant/constant');
const ErrorHandler = require('../messages/ErrorHandler');
const { responseCodesEnum } = require('../constant');
const {
    DOC_IS_TOO_LARGE,
    PHOTO_IS_TOO_LARGE,
    VIDEO_IS_TOO_LARGE,
    NOT_VALID_FILE,
    NOT_VALID_PHOTO_TYPE
} = require('../messages/error.messages');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            const docs = [];
            const photos = [];
            const videos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { mimetype, size } = allFiles[i];

                if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (DOC_MAX_SIZE < size) {
                        throw new ErrorHandler(responseCodesEnum.BAD_REQUEST,
                            DOC_IS_TOO_LARGE.customCode,
                            DOC_IS_TOO_LARGE.ua);
                    }

                    docs.push(allFiles[i]);
                } else if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new ErrorHandler(responseCodesEnum.BAD_REQUEST,
                            PHOTO_IS_TOO_LARGE.customCode,
                            PHOTO_IS_TOO_LARGE.ua);
                    }

                    photos.push(allFiles[i]);
                } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (VIDEO_MAX_SIZE < size) {
                        throw new ErrorHandler(responseCodesEnum.BAD_REQUEST,
                            VIDEO_IS_TOO_LARGE.customCode,
                            VIDEO_IS_TOO_LARGE.ua);
                    }

                    videos.push(allFiles[i]);
                } else {
                    throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, NOT_VALID_FILE.customCode);
                }
            }

            req.docs = docs;
            req.photos = photos;
            req.videos = videos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPhotoForAvatar: (req, res, next) => {
        try {
            // 1st var
            // if (req.photos.length > 1) {
            //     throw new Error("U can't upload more than one photo");
            // }

            // 2nd var
            const { files } = req;
            const allPhotosNames = Object.keys(files);

            // или так 2.1
            // for (let i = 0; i < allPhotosNames.length; i++) {
            //     if (!allPhotosNames[i].includes('avatar')) {
            //         throw new Error("U can't upload not-avatar photo");
            //     }
            // }

            // или сяк 2.2
            for (const allPhotosName of allPhotosNames) {
                if (allPhotosName !== 'avatar') {
                    throw new ErrorHandler(responseCodesEnum.BAD_REQUEST,
                        NOT_VALID_PHOTO_TYPE.customCode,
                        NOT_VALID_PHOTO_TYPE.ua);
                }
            }

            [req.avatar] = req.photos; // никогда б не догадался (без учёта условия), что это именно нулевой элемент
            // req.avatar = req.photos[0];

            next();
        } catch (e) {
            next(e);
        }
    }
};