const reveals = document.querySelectorAll(".reveal");

function animateReveal() {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", animateReveal);
animateReveal();

// -----------------------------




/* =========================
LIVRO 3D
========================= */

function criarLivro3D(){

    console.log("Livro iniciado");

    const container =
    document.getElementById("book3d");

        console.log(container);

    console.log(container.clientWidth);
    console.log(container.clientHeight);

    const scene =
    new THREE.Scene();

    scene.background = null;

    const camera =
    new THREE.PerspectiveCamera(
        75,
        container.clientWidth /
        container.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setClearColor(0x000000,0);

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(
        renderer.domElement
    );

    const controls =
    new THREE.OrbitControls(
        camera,
        renderer.domElement
    );

    controls.enableZoom = false;

    const geometry =
    new THREE.BoxGeometry(
        1.6,
        2.3,
        0.18
    );

    const loader =
    new THREE.TextureLoader();

    const lateral =
    loader.load(
    "https://i.postimg.cc/1RLVcVyD/pagina.png");

    const capa =
    loader.load(
    "https://i.postimg.cc/vZGRpXQB/capalivro.png");

    const contracapa =
    loader.load(
    "https://i.postimg.cc/j2y91n9B/contracapalivro.png");

    const linha =
    loader.load(
    "https://i.postimg.cc/gJX1vTKX/linha.png");

    const lateralTexture =
    loader.load(
    "https://i.postimg.cc/RV5qnrTf/paginasl.png");

    lateralTexture.center.set(0.5, 0.5);

    lateralTexture.rotation =
    Math.PI / 2;

    const materials = [

        new THREE.MeshStandardMaterial({
            map:lateralTexture
        }),

        new THREE.MeshStandardMaterial({
            map:linha
        }),

        new THREE.MeshStandardMaterial({
            map:lateral
        }),

        new THREE.MeshStandardMaterial({
            map:lateral
        }),

        new THREE.MeshStandardMaterial({
            map:capa
        }),

        new THREE.MeshStandardMaterial({
            map:contracapa
        })

    ];

    const book =
    new THREE.Mesh(
        geometry,
        materials
    );

    scene.add(book);

    const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.8
    );

    scene.add(ambientLight);

    const pointLight =
    new THREE.PointLight(
        0xffffff,
        1
    );

    pointLight.position.set(
        5,
        5,
        5
    );

    scene.add(pointLight);

    function animate(){

        requestAnimationFrame(animate);

        book.rotation.y += 0.005;

        controls.update();

        renderer.render(
            scene,
            camera
        );

    }

    window.addEventListener(
    'resize',
    () => {

        camera.aspect =
        container.clientWidth /
        container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    });

    animate();
}

criarLivro3D();


