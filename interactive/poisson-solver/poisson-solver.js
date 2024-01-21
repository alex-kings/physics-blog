class Grid {
    grid = [];
    sources = new Set();
    n;
    constructor(n, sources) {
        this.n=n;
        for(let i = 0; i < n; i++) this.grid.push(Array(n).fill(0));
        for(let source of sources) {
            this.grid[source[0]][source[1]] = 10;
            this.sources.add(JSON.stringify(source));
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
}

let myGrid = new Grid(10, [[3,3]]);
myGrid.solve();
for(let i = 0; i < 50; i++) myGrid.gaussSeidelStep();
myGrid.solve();
