export interface ImageData {
    width: number;
    height: number;
    pixels: number[];
}

export function parsePPM(data: string): ImageData {
    const pixels = [];
    const sanitized = data.replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/);

    const magicNumber = sanitized[0];
    const width = parseInt(sanitized[1]);
    const height = parseInt(sanitized[2]);
    const maxColor = parseInt(sanitized[3]);

    if (magicNumber !== "P3") {
        throw Error("Only P3 images are supported");
    }
    if (maxColor !== 255) {
        throw Error("Invalid Maximum Color");
    }

    let pixelIndex = 0;

    for (let i = 4; i < sanitized.length; i += 3) {
        pixels[pixelIndex++] = parseInt(sanitized[i]);
        pixels[pixelIndex++] = parseInt(sanitized[i + 1]);
        pixels[pixelIndex++] = parseInt(sanitized[i + 2]);
        pixels[pixelIndex++] = 255;
    }

    return { width, height, pixels };
}
