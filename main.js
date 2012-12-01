Physijs.scripts.worker = 'javascripts/physijs/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var renderer, scene, camera, box, plane;

var viewPort =  {
    width   : 640,
    height  : 480
};

// Gameobject properties
var charObj = {
    weight  : 1000,
    path    : 'assets/objects/characters/',
    file     : null
};

// Level properties
var lvl = {
    gravity : 10,
    speed   : 100, // maximum speed = 100%
    bgMusic  : {}
};

var leftWind, rightWind;


// all static object properties
var staticObjs = {
};

var drop, mesh, keyboard, cloud = [];

cloud.size = {
	width	: 12,
	height	: 5,
	depth	: 2
};

var aspect = viewPort.width/viewPort.height;

// Physic xD velocity, seconds, acceleration,

function init() 
{
    // Render Scene, Canvas and Camera setups
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( viewPort.width, viewPort.height );
    
    $container = $('#game-view');
    $container.append( renderer.domElement );
    $canvas = $('canvas');
    $canvas.css('background-color', '#336699');
    
    scene = new Physijs.Scene;
    lvl.bgMusic = document.getElementById('bgMusic');
    
    lvl.bgMusic.play();
    
    // camera setting
    
    camera = new THREE.PerspectiveCamera(
        75,
        aspect,
        1,
        1000
    );
        
    camera.position.z = 40;
    
    // keyboard setup
    keyboard = new THREEx.KeyboardState();
    
    // character setup
    charObj.file = 'drop.js';
    var loader = new THREE.JSONLoader();
    loader.load( charObj.path+charObj.file , function( geometry, material ) {
        drop = new Physijs.BoxMesh( geometry, new THREE.MeshBasicMaterial( {color:0xfffFFF} ) );
        scene.setGravity( new THREE.Vector3(0,-10,0) );
        scene.add( drop );
        
        drop.addEventListener('collision', function(object, linear_velocity, angular_velocity ) {
            drop.material.color.g *= .5;
            alert('game over! refresh browser to restart! we had no time to develope it until the end! :D');
        });
        loadLevel();
    });
    box = new Physijs.BoxMesh(
        new THREE.PlaneGeometry( 5, 5 ),
        new THREE.MeshBasicMaterial({ color: 0x888888 })
    );
        
        //scene.add(box);
    
}

/*function loadLevel() {

    for( i = 1; i < 20; i++ ) {
        cloud[i]	= new Physijs.BoxMesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshBasicMaterial({ color: 0x888888 })
        );
        cloud[i].position.set( THREE.Math.randFloat( -33, 33 ), -10, 0 );
        scene.add(cloud[i]);
    }
}*/


function loadLevel() {
	var geometry	= new THREE.PlaneGeometry( cloud.size.width, cloud.size.height, cloud.size.depth );
	var material	= new THREE.MeshBasicMaterial( { color : 0x000000 } );

	cloud[0]			= new Physijs.BoxMesh( geometry, material );
	cloud[0].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -20, 0 );

	cloud[1]			= new Physijs.BoxMesh( geometry, material );
	cloud[1].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -40, 0 );

	cloud[2]			= new Physijs.BoxMesh( geometry, material );
	cloud[2].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -60, 0 );

	cloud[3]			= new Physijs.BoxMesh( geometry, material );
	cloud[3].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -80, 0 );

	cloud[4]			= new Physijs.BoxMesh( geometry, material );
	cloud[4].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -100, 0 );

	cloud[5]			= new Physijs.BoxMesh( geometry, material );
	cloud[5].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -120, 0 );

	cloud[6]			= new Physijs.BoxMesh( geometry, material );
	cloud[6].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -140, 0 );

	cloud[7]			= new Physijs.BoxMesh( geometry, material );
	cloud[7].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -160, 0 );

	cloud[8]			= new Physijs.BoxMesh( geometry, material );
	cloud[8].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -180, 0 );

	cloud[9]			= new Physijs.BoxMesh( geometry, material );
	cloud[9].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -200, 0 );

	cloud[10]			= new Physijs.BoxMesh( geometry, material );
	cloud[10].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -220, 0 );

	cloud[11]			= new Physijs.BoxMesh( geometry, material );
	cloud[11].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -240, 0 );

	cloud[12]			= new Physijs.BoxMesh( geometry, material );
	cloud[12].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -260, 0 );

	cloud[13]			= new Physijs.BoxMesh( geometry, material );
	cloud[13].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -280, 0 );

	cloud[14]			= new Physijs.BoxMesh( geometry, material );
	cloud[14].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -300, 0 );

	cloud[15]			= new Physijs.BoxMesh( geometry, material );
	cloud[15].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -320, 0 );

	cloud[16]			= new Physijs.BoxMesh( geometry, material );
	cloud[16].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -340, 0 );

	cloud[17]			= new Physijs.BoxMesh( geometry, material );
	cloud[17].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -360, 0 );

	cloud[18]			= new Physijs.BoxMesh( geometry, material );
	cloud[18].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -380, 0 );

	cloud[19]			= new Physijs.BoxMesh( geometry, material );
	cloud[19].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -400, 0 );

	cloud[20]			= new Physijs.BoxMesh( geometry, material );
	cloud[20].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -420, 0 );

	cloud[21]			= new Physijs.BoxMesh( geometry, material );
	cloud[21].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -440, 0 );

	cloud[22]			= new Physijs.BoxMesh( geometry, material );
	cloud[22].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -460, 0 );

	cloud[23]			= new Physijs.BoxMesh( geometry, material );
	cloud[23].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -480, 0 );

	cloud[24]			= new Physijs.BoxMesh( geometry, material );
	cloud[24].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -500, 0 );

	cloud[25]			= new Physijs.BoxMesh( geometry, material );
	cloud[25].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -520, 0 );

	cloud[26]			= new Physijs.BoxMesh( geometry, material );
	cloud[26].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -540, 0 );

	cloud[27]			= new Physijs.BoxMesh( geometry, material );
	cloud[27].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -560, 0 );

	cloud[28]			= new Physijs.BoxMesh( geometry, material );
	cloud[28].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -580, 0 );

	cloud[29]			= new Physijs.BoxMesh( geometry, material );
	cloud[29].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -600, 0 );

	cloud[30]			= new Physijs.BoxMesh( geometry, material );
	cloud[30].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -620, 0 );

	cloud[85]			= new Physijs.BoxMesh( geometry, material );
	cloud[85].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -640, 0 );

	cloud[31]			= new Physijs.BoxMesh( geometry, material );
	cloud[31].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -660, 0 );

	cloud[32]			= new Physijs.BoxMesh( geometry, material );
	cloud[32].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -680, 0 );

	cloud[33]			= new Physijs.BoxMesh( geometry, material );
	cloud[33].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -700, 0 );

	cloud[34]			= new Physijs.BoxMesh( geometry, material );
	cloud[34].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -720, 0 );

	cloud[35]			= new Physijs.BoxMesh( geometry, material );
	cloud[35].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -740, 0 );

	cloud[36]			= new Physijs.BoxMesh( geometry, material );
	cloud[36].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -760, 0 );

	cloud[37]			= new Physijs.BoxMesh( geometry, material );
	cloud[37].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -780, 0 );

	cloud[38]			= new Physijs.BoxMesh( geometry, material );
	cloud[38].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -800, 0 );

	cloud[39]			= new Physijs.BoxMesh( geometry, material );
	cloud[39].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -820, 0 );

	cloud[40]			= new Physijs.BoxMesh( geometry, material );
	cloud[40].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -840, 0 );

	cloud[41]			= new Physijs.BoxMesh( geometry, material );
	cloud[41].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -860, 0 );

	cloud[42]			= new Physijs.BoxMesh( geometry, material );
	cloud[42].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -880, 0 );

	cloud[43]			= new Physijs.BoxMesh( geometry, material );
	cloud[43].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -900, 0 );

	cloud[44]			= new Physijs.BoxMesh( geometry, material );
	cloud[44].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -920, 0 );

	cloud[45]			= new Physijs.BoxMesh( geometry, material );
	cloud[45].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -940, 0 );

	cloud[46]			= new Physijs.BoxMesh( geometry, material );
	cloud[46].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -960, 0 );

	cloud[47]			= new Physijs.BoxMesh( geometry, material );
	cloud[47].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -980, 0 );

	cloud[48]			= new Physijs.BoxMesh( geometry, material );
	cloud[48].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1000, 0 );

	cloud[49]			= new Physijs.BoxMesh( geometry, material );
	cloud[49].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1020, 0 );

	cloud[50]			= new Physijs.BoxMesh( geometry, material );
	cloud[50].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1040, 0 );

	cloud[51]			= new Physijs.BoxMesh( geometry, material );
	cloud[51].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1060, 0 );

	cloud[52]			= new Physijs.BoxMesh( geometry, material );
	cloud[52].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1080, 0 );

	cloud[53]			= new Physijs.BoxMesh( geometry, material );
	cloud[53].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1100, 0 );

	cloud[54]			= new Physijs.BoxMesh( geometry, material );
	cloud[54].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1120, 0 );

	cloud[55]			= new Physijs.BoxMesh( geometry, material );
	cloud[55].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1140, 0 );

	cloud[56]			= new Physijs.BoxMesh( geometry, material );
	cloud[56].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1160, 0 );

	cloud[57]			= new Physijs.BoxMesh( geometry, material );
	cloud[57].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1180, 0 );

	cloud[58]			= new Physijs.BoxMesh( geometry, material );
	cloud[58].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1200, 0 );

	cloud[59]			= new Physijs.BoxMesh( geometry, material );
	cloud[59].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1220, 0 );

	cloud[60]			= new Physijs.BoxMesh( geometry, material );
	cloud[60].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1240, 0 );

	cloud[61]			= new Physijs.BoxMesh( geometry, material );
	cloud[61].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1260, 0 );

	cloud[62]			= new Physijs.BoxMesh( geometry, material );
	cloud[62].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1280, 0 );

	cloud[63]			= new Physijs.BoxMesh( geometry, material );
	cloud[63].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1300, 0 );

	cloud[64]			= new Physijs.BoxMesh( geometry, material );
	cloud[64].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1320, 0 );

	cloud[65]			= new Physijs.BoxMesh( geometry, material );
	cloud[65].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1340, 0 );

	cloud[66]			= new Physijs.BoxMesh( geometry, material );
	cloud[66].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1360, 0 );

	cloud[67]			= new Physijs.BoxMesh( geometry, material );
	cloud[67].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1380, 0 );

	cloud[68]			= new Physijs.BoxMesh( geometry, material );
	cloud[68].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1400, 0 );

	cloud[69]			= new Physijs.BoxMesh( geometry, material );
	cloud[69].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1420, 0 );

	cloud[70]			= new Physijs.BoxMesh( geometry, material );
	cloud[70].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1440, 0 );

	cloud[71]			= new Physijs.BoxMesh( geometry, material );
	cloud[71].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1460, 0 );

	cloud[72]			= new Physijs.BoxMesh( geometry, material );
	cloud[72].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1480, 0 );

	cloud[73]			= new Physijs.BoxMesh( geometry, material );
	cloud[73].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1500, 0 );

	cloud[74]			= new Physijs.BoxMesh( geometry, material );
	cloud[74].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1520, 0 );

	cloud[75]			= new Physijs.BoxMesh( geometry, material );
	cloud[75].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1540, 0 );

	cloud[76]			= new Physijs.BoxMesh( geometry, material );
	cloud[76].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1560, 0 );

	cloud[77]			= new Physijs.BoxMesh( geometry, material );
	cloud[77].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1580, 0 );

	cloud[78]			= new Physijs.BoxMesh( geometry, material );
	cloud[78].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1600, 0 );

	cloud[79]			= new Physijs.BoxMesh( geometry, material );
	cloud[79].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1620, 0 );

	cloud[80]			= new Physijs.BoxMesh( geometry, material );
	cloud[80].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1640, 0 );

	cloud[81]			= new Physijs.BoxMesh( geometry, material );
	cloud[81].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1660, 0 );

	cloud[82]			= new Physijs.BoxMesh( geometry, material );
	cloud[82].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1680, 0 );

	cloud[83]			= new Physijs.BoxMesh( geometry, material );
	cloud[83].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1700, 0 );

	cloud[84]			= new Physijs.BoxMesh( geometry, material );
	cloud[84].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -1720, 0 );

	addClouds(cloud);

	update();
}

function addClouds(clouds) {
	for( i = 0; i < clouds.length; i++ ) {
		scene.add(clouds[i]);
	}
}

function update() {
    camera.position.y = drop.position.y;
    
    if( keyboard.pressed( 'A' ) ) {
            drop.position.x -= 0.7;
    }
    else if( keyboard.pressed( 'D' ) ) {
            drop.position.x += 0.7;
    }
    drop.__dirtyPosition = true;
    scene.simulate(); // run physics
    render();
}

function render()
{
    renderer.render( scene, camera); // render the scene
    requestAnimationFrame( update );
}