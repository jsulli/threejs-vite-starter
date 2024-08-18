import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
    AxesHelper,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";

export class Viewer {

    private controls: OrbitControls
    private camera: PerspectiveCamera

    private renderer: WebGLRenderer
    private scene: Scene

    private obj: Mesh


    constructor(targetElement: Element) {

        this.renderer = new WebGLRenderer()
        targetElement.appendChild(this.renderer.domElement)

        this.camera = new PerspectiveCamera(75)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.scene = new Scene()

        const mat = new MeshBasicMaterial({ wireframe: true })
        this.obj = new Mesh(new BoxGeometry(1, 1, 1), mat)
        this.scene.add(this.obj)

        const axes = new AxesHelper(1)
        this.scene.add(axes)

        this.camera.position.set(4, 3, 5)
        this.camera.lookAt(this.scene.position)
        this.scene.add(this.camera)

        window.onresize = this.onResize.bind(this)

        this.onResize()
        this.update()
    }

    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    
    update() {
        requestAnimationFrame(this.update.bind(this))

        const timer = performance.now() * 0.0015
        this.obj.position.y = 0.5 * Math.sin(timer)
        this.obj.rotation.x -= 0.01
        this.obj.rotation.y -= 0.004

        this.controls.update()
        this.render()
    }

    
    render() {
        this.renderer.render(this.scene, this.camera)
    }
}