import { ImageData } from "./parse";

export function generateHTML({ width, height, pixels }: ImageData): string {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>

<style>
	body {
		height: 100vh;
	}
	#wrapper {
		height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
	}
</style>

<body>
	<div id="wrapper">
		<div>
			<canvas id="image-canvas" width=${width} height=${height}></canvas>
			<p style="text-align: center;">Width: ${width} Height: ${height}</p>
		</div>
	</div>
</body>
<script>
	
	function display() {
		const canvas = document.getElementById('image-canvas')
		const ctx = canvas.getContext("2d")
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		const pixels = JSON.parse('[${pixels}]')
		const img = ctx.getImageData(0, 0, ${width}, ${height})
		pixels.forEach((val, i) => img.data[i] = val)
		ctx.putImageData(img, 0, 0)
	}

	display()

</script>

</html>
	`;
}
