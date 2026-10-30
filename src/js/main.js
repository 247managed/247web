import '../styles/main.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// ====================================
// Smooth Scrolling with Lenis
// ====================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// ====================================
// Three.js Particle Network Hero
// ====================================
class ParticleNetwork {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    
    this.init()
  }
  
  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.camera.position.z = 5
    
    // Create particles
    const particleCount = 100
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    const navyColor = new THREE.Color(0x2A4A64)
    const goldColor = new THREE.Color(0xF0A019)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 5
      
      const color = Math.random() > 0.7 ? goldColor : navyColor
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })
    
    this.particles = new THREE.Points(geometry, material)
    this.scene.add(this.particles)
    
    // Create connection lines
    const lineGeometry = new THREE.BufferGeometry()
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xF0A019,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    })
    
    this.lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    this.scene.add(this.lines)
    
    this.animate()
    this.setupResize()
  }
  
  animate = () => {
    requestAnimationFrame(this.animate)
    
    this.particles.rotation.y += 0.001
    this.particles.rotation.x += 0.0005
    
    // Update connections
    const positions = this.particles.geometry.attributes.position.array
    const linePositions = []
    
    for (let i = 0; i < positions.length; i += 3) {
      for (let j = i + 3; j < positions.length; j += 3) {
        const dx = positions[i] - positions[j]
        const dy = positions[i + 1] - positions[j + 1]
        const dz = positions[i + 2] - positions[j + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        
        if (dist < 2) {
          linePositions.push(
            positions[i], positions[i + 1], positions[i + 2],
            positions[j], positions[j + 1], positions[j + 2]
          )
        }
      }
    }
    
    this.lines.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    )
    
    this.renderer.render(this.scene, this.camera)
  }
  
  setupResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }
}

// Initialize particle network if canvas exists
const heroCanvas = document.getElementById('hero-canvas')
if (heroCanvas) {
  new ParticleNetwork(heroCanvas)
}

// ====================================
// Spotlight Cursor Effect
// ====================================
const spotlight = document.querySelector('.spotlight')
if (spotlight) {
  document.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--mouse-x', `${e.clientX}px`)
    spotlight.style.setProperty('--mouse-y', `${e.clientY}px`)
  })
}

// ====================================
// Kinetic Headline - Word Rotation
// ====================================
const kineticText = document.querySelector('[data-kinetic-text]')
if (kineticText) {
  const words = ['.NET 10', 'Blazor', 'SwiftUI', 'React', '.NET MAUI']
  let currentIndex = 0
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length
    gsap.to(kineticText, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        kineticText.textContent = words[currentIndex]
        gsap.to(kineticText, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        })
      },
    })
  }, 2500)
}

// ====================================
// Animated Code Editor
// ====================================
class CodeEditor {
  constructor(element) {
    this.element = element
    this.lines = [
      { lang: 'csharp', code: 'public class ProductService {' },
      { lang: 'csharp', code: '  private readonly IRepository _repo;' },
      { lang: 'csharp', code: '  public async Task<Product> GetAsync(int id)' },
      { lang: 'csharp', code: '    => await _repo.FindByIdAsync(id);' },
      { lang: 'csharp', code: '}' },
      { lang: 'swift', code: 'struct ProductView: View {' },
      { lang: 'swift', code: '  @State private var products: [Product]' },
      { lang: 'swift', code: '  var body: some View {' },
      { lang: 'swift', code: '    List(products) { product in' },
      { lang: 'swift', code: '      ProductRow(product: product)' },
      { lang: 'swift', code: '    }' },
      { lang: 'swift', code: '  }' },
      { lang: 'swift', code: '}' },
    ]
    this.currentLine = 0
    this.startTyping()
  }
  
  startTyping() {
    this.element.innerHTML = ''
    this.typeLine()
  }
  
  typeLine() {
    if (this.currentLine >= this.lines.length) {
      setTimeout(() => {
        this.currentLine = 0
        this.startTyping()
      }, 3000)
      return
    }
    
    const line = this.lines[this.currentLine]
    const lineDiv = document.createElement('div')
    lineDiv.className = 'code-line'
    lineDiv.innerHTML = `
      <span class="line-number">${this.currentLine + 1}</span>
      <span class="code-content"></span>
    `
    this.element.appendChild(lineDiv)
    
    const codeContent = lineDiv.querySelector('.code-content')
    let charIndex = 0
    
    const typeChar = () => {
      if (charIndex < line.code.length) {
        codeContent.textContent += line.code[charIndex]
        charIndex++
        setTimeout(typeChar, 30 + Math.random() * 30)
      } else {
        this.currentLine++
        setTimeout(() => this.typeLine(), 100)
      }
    }
    
    typeChar()
  }
}

const codeEditorEl = document.getElementById('code-editor')
if (codeEditorEl) {
  new CodeEditor(codeEditorEl)
}

// ====================================
// Animated Workflow Diagram
// ====================================
class WorkflowDiagram {
  constructor(svg) {
    this.svg = svg
    this.paths = svg.querySelectorAll('.workflow-path')
    this.particles = []
    this.animate()
  }
  
  animate() {
    this.paths.forEach((path, i) => {
      setTimeout(() => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          onComplete: () => this.animateParticle(path),
        })
      }, i * 300)
    })
  }
  
  animateParticle(path) {
    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    particle.setAttribute('r', '4')
    particle.setAttribute('fill', '#F0A019')
    this.svg.appendChild(particle)
    
    gsap.to(particle, {
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
      },
      duration: 3,
      ease: 'none',
      repeat: -1,
      repeatDelay: 1,
    })
  }
}

const workflowSvg = document.getElementById('workflow-diagram')
if (workflowSvg) {
  ScrollTrigger.create({
    trigger: workflowSvg,
    start: 'top 80%',
    onEnter: () => new WorkflowDiagram(workflowSvg),
    once: true,
  })
}

// ====================================
// Scroll-Driven Animations
// ====================================
gsap.utils.toArray('.reveal-on-scroll').forEach((element, i) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
    },
    y: 60,
    opacity: 0,
    duration: 1,
    delay: i * 0.1,
    ease: 'power3.out',
  })
})

// Parallax sections
gsap.utils.toArray('[data-parallax]').forEach((section) => {
  const depth = section.dataset.parallax || 0.5
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    y: (i, target) => -ScrollTrigger.maxScroll(window) * depth,
    ease: 'none',
  })
})

// ====================================
// Bento Grid 3D Tilt
// ====================================
document.querySelectorAll('.bento-item').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    if (document.body.classList.contains('motion-paused')) return
    
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * 10
    const rotateY = ((x - centerX) / centerX) * 10
    
    gsap.to(card, {
      rotationX: -rotateX,
      rotationY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    })
  })
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  })
})

// ====================================
// Magnetic Buttons
// ====================================
document.querySelectorAll('.btn-magnetic').forEach((button) => {
  button.addEventListener('mousemove', (e) => {
    if (document.body.classList.contains('motion-paused')) return
    
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  })
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  })
})

// ====================================
// Motion Pause Control
// ====================================
const motionToggle = document.querySelector('[data-motion-toggle]')
if (motionToggle) {
  const isPaused = sessionStorage.getItem('motion-paused') === 'true'
  if (isPaused) {
    document.body.classList.add('motion-paused')
    motionToggle.setAttribute('aria-pressed', 'true')
  }
  
  motionToggle.addEventListener('click', () => {
    const paused = document.body.classList.toggle('motion-paused')
    motionToggle.setAttribute('aria-pressed', paused.toString())
    sessionStorage.setItem('motion-paused', paused.toString())
  })
}

// ====================================
// Dark Mode Toggle
// ====================================
const darkModeToggle = document.querySelector('[data-dark-toggle]')
if (darkModeToggle) {
  const isDark = localStorage.getItem('theme') === 'dark' || 
                 (!localStorage.getItem('theme') && true)
  
  if (isDark) {
    document.documentElement.classList.add('dark')
  }
  
  darkModeToggle.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  })
}

// ====================================
// Mobile Menu
// ====================================
const menuToggle = document.querySelector('[data-menu-toggle]')
const mobileMenu = document.querySelector('[data-mobile-menu]')

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open')
    menuToggle.setAttribute('aria-expanded', isOpen.toString())
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })
  
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open')
      menuToggle.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    })
  })
}

// ====================================
// Animated Charts (will be initialized per page)
// ====================================
window.initCharts = function() {
  // This will be called from individual pages
  console.log('Charts initialized')
}

console.log('247 Managed Network Solutions - 2027 Premium Experience Loaded')
