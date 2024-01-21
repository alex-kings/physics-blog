import * as THREE from 'three';

// Set scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

// Lighting
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
directionalLight.position.set(-20,20,-20);
directionalLight.lookAt(new THREE.Vector3(0,0,0))
scene.add( directionalLight );

camera.position.z = 15;
camera.position.y = 7;
camera.position.x = 3;
camera.lookAt(new THREE.Vector3(0,0,0))


class Grid {
    grid = [];
    sources = new Set();
    n = 30;
    L = 10;
    geometry = new THREE.BoxGeometry( this.L/this.n, this.L/this.n, this.L/this.n );

    // Rectangles contains threejs objects
    rectangles = [];
    constructor(sources) {
        for(let i = 0; i < this.n; i++) {
            this.grid.push(Array(this.n).fill(0));
            this.rectangles.push([]);
        }
        for(let source of sources) {
            this.grid[source[0]][source[1]] = 10;
            this.sources.add(JSON.stringify(source));
        }
        this.createRectangles();
    }

    createRectangles() {
        for(let i = 0; i < this.n-1; i++) {
            for(let j = 0; j < this.n-1; j++) {
                const rectangle = new THREE.Mesh(this.geometry, material);
                rectangle.position.set(
                    (i*this.L)/this.n - this.L/2,
                    this.grid[i][j] - this.L/2,
                    (j*this.L)/this.n - this.L/2);
                this.rectangles[i][j] = rectangle;
                scene.add(rectangle);
            }
        }
    }

    // Perform 1 step of the red-black gauss sidel
    redBlackStep(type) {
        for(let i = 1; i < this.n-1; i++) {
            for(let j = (type+i)%2 + 1; j < this.n - 1; j+=2) {
                if(this.sources.has(JSON.stringify([i,j]))) continue
                this.grid[i][j] = (
                    this.grid[i-1][j] + this.grid[i+1][j] +
                    this.grid[i][j-1] + this.grid[i][j+1]
                ) / 4;
            }
        }
    }
    gaussSeidelStep() {
        this.redBlackStep(0);
        this.redBlackStep(1);
    }

    solve() {
        console.log(this.grid);   
    }
    updateRectangles() {
        for(let i = 0; i < this.n-1; i++) {
            for(let j = 0; j < this.n-1; j++) {
                this.rectangles[i][j].position.y = this.grid[i][j] - this.L/2;
            }
        }
    }   
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}


let myGrid = new Grid([[3,3],[13,13]]);
myGrid.solve();
for(let i = 0; i < 40; i++) myGrid.gaussSeidelStep();
myGrid.solve();

myGrid.updateRectangles();

animate();