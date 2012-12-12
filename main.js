Physijs.scripts.worker = './javascripts/physijs/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var renderer, scene, camera, box, plane, materials;

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
    
    $container = $('#game_view');
    $container.append( renderer.domElement );
    $canvas = $('canvas');
    $canvas.css('background-color', '#336699');
    
    scene = new Physijs.Scene;
    lvl.bgMusic = document.getElementById('bgMusic');
    
    lvl.bgMusic.play();
    
    // camera setting
    camera = new THREE.PerspectiveCamera(
        35,
        aspect,
        1,
        1000
    );
        
    camera.position.z = 80;
    
    // keyboard setup
    keyboard = new THREEx.KeyboardState();
    
    // character setup
	charObj.file = 'drop.js';
    var loader = new THREE.JSONLoader();
    loader.load( charObj.path+charObj.file , function( geometry, material ) {

        drop = new Physijs.BoxMesh( geometry, new THREE.MeshBasicMaterial( {color:0xfffFFF} ) );
        scene.setGravity( new THREE.Vector3( 0, 0, 0 ) );
        scene.add( drop );
        
        drop.addEventListener('collision', function(object, linear_velocity, angular_velocity ) {
            drop.material.color.g *= .5;
            alert('game over! refresh browser to restart! we had no time to develope it until the end! :D');
        });
        loadLevel();

    });
	
/*	//sets the enviroment
	var urls = ['./posy.jpeg','./posy.jpeg','./posy.jpeg','./posy.jpeg','./posy.jpeg','./posy.jpeg'];
	env = THREE.ImageUtils.loadTextureCube( urls );
	env.format = THREE.RGBFormat;


	//loads drop
	var loader = new THREE.JSONLoader();
	loader.load('./assets/objects/characters/drop.js', function( geometry ) {

		var shader = THREE.ShaderUtils.lib[ "fresnel" ];
		var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
		uniforms[ "tCube" ].value = env;

		var material1 = new THREE.ShaderMaterial( {
			fragmentShader	: shader.fragmentShader,
			vertexShader	: shader.vertexShader,
			uniforms		: uniforms
		} );

		materials.push( material1 );

		var material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		materials.push( material2 );

		geometry.materials = materials;

		mesh = new Physijs.BoxMesh( geometry, new THREE.MeshFaceMaterial(materials));
		mesh.position.set(0,0,0);

		scene.add( mesh );
	});*/


}

function loadLevel() {
	var geometry	= new THREE.PlaneGeometry( cloud.size.width, cloud.size.height, cloud.size.depth );
	var material	= new THREE.MeshBasicMaterial( { color : 0x000000 } );
	
	for( i = 0; i < 100; i++ ) {
		cloud[i]			= new Physijs.BoxMesh( geometry, material );
		cloud[i].position	= new THREE.Vector3( THREE.Math.randFloat( -33, 33 ), -(20 * (i + 1)), 0 );
	}

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

	drop.position.y -= 0.2;

   	if( keyboard.pressed( 'A' ) ) {
		if( drop.position.x > -32 ) {
			drop.position.x -= 0.7;
		}
   	}
    else if( keyboard.pressed( 'D' ) ) {
		if( drop.position.x < 32) {
			drop.position.x += 0.7;
		}
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