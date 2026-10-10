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

    const container = document.getElementById("book3d");
    if (!container || typeof THREE === "undefined") return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;

    const loader = new THREE.TextureLoader();

    function tex(url){
        const t = loader.load(url);
        t.encoding = THREE.sRGBEncoding;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return t;
    }

    const lateral        = tex("https://i.postimg.cc/1RLVcVyD/pagina.png");
    const capa           = tex("https://i.postimg.cc/vZGRpXQB/capalivro.png");
    const contracapa     = tex("https://i.postimg.cc/j2y91n9B/contracapalivro.png");
    const linha          = tex("https://i.postimg.cc/gJX1vTKX/linha.png");
    const lateralTexture = tex("https://i.postimg.cc/RV5qnrTf/paginasl.png");

    lateralTexture.center.set(0.5, 0.5);
    lateralTexture.rotation = Math.PI / 2;

    const materials = [
        new THREE.MeshStandardMaterial({ map:lateralTexture }),
        new THREE.MeshStandardMaterial({ map:linha }),
        new THREE.MeshStandardMaterial({ map:lateral }),
        new THREE.MeshStandardMaterial({ map:lateral }),
        new THREE.MeshStandardMaterial({ map:capa }),
        new THREE.MeshStandardMaterial({ map:contracapa })
    ];

    const book = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 2.3, 0.18),
        materials
    );
    scene.add(book);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // só anima quando o livro está visível
    let visivel = true;
    new IntersectionObserver(([e]) => { visivel = e.isIntersecting; })
        .observe(container);

    function animate(){
        requestAnimationFrame(animate);
        if (!visivel) return;
        book.rotation.y += 0.005;
        controls.update();
        renderer.render(scene, camera);
    }

    // acompanha qualquer mudança de tamanho do container
    function ajustar(){
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    new ResizeObserver(ajustar).observe(container);

    animate();
}

criarLivro3D();