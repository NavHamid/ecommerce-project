export default function imagePath(path) {
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
        return path;
    }

    return `/${path}`;
}
