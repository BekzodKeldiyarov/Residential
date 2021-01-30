import * as THREE from './three/build/three.module.js';

        import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
        import { ColladaLoader } from 'https://unpkg.com/three/examples/jsm/loaders/ColladaLoader.js';

		let scene, renderer, camera, stats;
		let model, 
        //skeleton, 
        mixer, clock;
        let rotationSpeedY = 0.01;
        let object;
		const crossFadeControls = [];
		let panelSettings, numAnimations;

        init();

         let butM2 = document.getElementById("button*2");
         butM2.onclick = function myFunction() {
             rotationSpeedY = 0.02;
        }
        let butD2 = document.getElementById("button/2");
        butD2.onclick = function myFunction() {
             rotationSpeedY = 0.005;
        }
        let but1 = document.getElementById("button1");
        but1.onclick = function myFunction() {
             rotationSpeedY = 0.01;
            
        }
        let butS = document.getElementById("butstop");
        butS.onclick = function myFunction() {
             rotationSpeedY = 0;
        }

        let butP= document.getElementById("butplay");
        butP.onclick = function myFunction() { 
             rotationSpeedY = 0.01;
        }


		function init() {

			const container = document.getElementById( 'illustrate-complex-inner' );
			clock = new THREE.Clock();

			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xffffff );

			const hemiLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1);
			hemiLight.position.set( 500, 500, 500 );
			scene.add( hemiLight );

            // const spLight = new THREE.SpotLight( 0xffffff );
            // spLight.position.set( -100, 2000, 100 );
            // spLight.castShadow = true;
            // spLight.shadow.mapSize.width = window.innerWidth;
            // spLight.shadow.mapSize.height = window.innerHeight;

            // spLight.shadow.camera.near = 500;
            // spLight.shadow.camera.far = 3000;
            // spLight.shadow.camera.fov = 50;
            // scene.add( spLight );

            const spotLight = new THREE.SpotLight( 0xffffff );
            spotLight.position.set( 100, 1000, 100 );
            spotLight.castShadow = true;
            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;

            spotLight.shadow.camera.near = 500;
            spotLight.shadow.camera.far = 2000;
            spotLight.shadow.camera.fov = 30;

            scene.add( spotLight );
            
            // const light = new THREE.AmbientLight( 0x404040 );
            // scene.add(light);

			// ground
            
            let geometry = new THREE.PlaneBufferGeometry( 100, 100 )
            geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
            
            // const mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
			// mesh.rotation.x = Math.PI / 2;
            // mesh.receiveShadow = true;
            // var box = new THREE.Box3().setFromObject( mesh );
            // box.center( mesh.position ); // this re-sets the mesh position
            // mesh.position.multiplyScalar( - 1 );
            
            // scene.add( mesh );
            // const loader = new GLTFLoader();
			// loader.load('models/export/complex-2.glb', function ( gltf ) {
                
            //     const model = gltf.scene;
			// 	model.position.set( 90, -66, 0 );
			// 	model.scale.set( 0.01, 0.01, 0.01 );
			// 	model.traverse( function ( child ) {

			// 		//if ( child.isMesh ) child.material.envMap = envMap;

			// 	} );
			// 	scene.add( model );

			// 	animate();

            // } );

            let dae;
            const loader = new ColladaLoader();
			loader.load( 'models/newComplex/Exterer01.DAE', function ( collada ) {

                dae = collada.scene;
                
                dae.position.set( 90, -70, 0 );
				dae.scale.set( 0.01, 0.01, 0.01 );

				dae.traverse( function ( child ) {

					if ( child.isMesh ) {
						// model does not have normals
						child.material.flatShading = true;

					}

				} );

				// dae.scale.x = dae.scale.y = dae.scale.z = 10.0;
                // dae.updateMatrix();
                scene.add(dae)
				animate();

			} );
            
            function onProgress() {

            }
            function onError() {

            }
            // const mtlLoader = new MTLLoader();
            // let url = "models/newComplex/Exterer01.mtl";
            // mtlLoader.load(url, function(materials){
            //     materials.preload();
            //     const objLoader = new OBJLoader();
            //     objLoader.setMaterials(materials);
            //     objLoader.load("models/newComplex/Exterer01.obj", function(object) {
            //         //const model = object.scene;
            //         object.position.x = 90;
            //         object.position.y = -66;
            //         object.scale.set( 0.01, 0.01, 0.01 );
            //         object.traverse( function ( child ) {
            //             //if ( child.isMesh ) child.material.envMap = envMap;
            //         } );
            //         scene.add( object );
            //         animate();
                    
            //     }, onProgress, onError())
            // })

			renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( container.clientWidth , window.innerHeight /2);
			//renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.outputEncoding = THREE.sRGBEncoding;
			renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );
            
            let w = window.innerWidth
            let h = window.innerHeight

			// camera
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 10, 700 );
            //camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
			camera.position.set( 10, 25, 50 );

			const controls = new OrbitControls( camera, renderer.domElement );
			controls.enablePan = false;
			controls.enableZoom = true;
			controls.target.set( 0, 0, 0 );
			controls.update();

			window.addEventListener( 'resize', onWindowResize, false );

		}

		function modifyTimeScale( speed ) {

			mixer.timeScale = speed;

		}

		function onWindowResize() {

            const container = document.getElementById( 'illustrate-complex-inner' );
			camera.aspect = container.clientWidth / container.clinetHeight;
			camera.updateProjectionMatrix();

            renderer.setSize( container.clientWidth , container.fullHeight);
            // renderer.setSize(,);

        }
        

		function animate() {

			// Render loop

			requestAnimationFrame( animate );
            //model.rotation.y += rotationSpeedY;
			renderer.render( scene, camera );

        }