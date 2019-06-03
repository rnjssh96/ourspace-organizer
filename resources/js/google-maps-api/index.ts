declare global {
    interface Window {
        google: any;
    }
}

/**
 * createGoogleMap
 */
const createGoogleMap = (elementId: string, properties: any) =>
    new window.google.maps.Map(document.getElementById(elementId), properties);
export default createGoogleMap;
