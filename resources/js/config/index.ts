// allowed-file-mime
import _AllowedFileMime from './allowed-file-mime.json';

export namespace AllowedFileMime {
    export const FORMATS = Object.keys(_AllowedFileMime.image);
    export const MIMES = Object.values(_AllowedFileMime.image);
}

// google-maps-api
import _GoogleMapsApi from './google-maps-api.json';

export namespace GoogleMapsApi {
    export const API_KEY = _GoogleMapsApi['api-key'];
}
