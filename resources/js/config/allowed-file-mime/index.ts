import _AllowedFileMime from './config.json';

export const AllowedFileMime = {
    FORMATS: Object.keys(_AllowedFileMime.image),
    MIMES: Object.values(_AllowedFileMime.image),
};
