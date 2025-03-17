// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Navigation menu toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
      })
    }
  
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar")
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // 3D Animation for Home Section
    const homeCanvas = document.getElementById("homeCanvas")
    if (homeCanvas) {
      // Import Three.js library
      const THREE = window.THREE
  
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
      const renderer = new THREE.WebGLRenderer({
        canvas: homeCanvas,
        alpha: true,
        antialias: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
  
      // Create particles
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 2000
  
      const posArray = new Float32Array(particlesCount * 3)
  
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5
      }
  
      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
  
      // Materials
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x6c63ff,
      })
  
      // Mesh
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particlesMesh)
  
      // Add some 3D objects
      const geometry = new THREE.IcosahedronGeometry(1, 0)
      const material = new THREE.MeshBasicMaterial({
        color: 0x6c63ff,
        wireframe: true,
      })
  
      const icosahedron = new THREE.Mesh(geometry, material)
      scene.add(icosahedron)
  
      // Position camera
      camera.position.z = 3
  
      // Animation
      function animate() {
        requestAnimationFrame(animate)
  
        particlesMesh.rotation.x += 0.0005
        particlesMesh.rotation.y += 0.0005
  
        icosahedron.rotation.x += 0.002
        icosahedron.rotation.y += 0.002
  
        renderer.render(scene, camera)
      }
  
      animate()
  
      // Handle window resize
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      })
    }
  
    // Add this code after the existing 3D animation code for the home section
  
    // 3D Icons for Problem Cards
    const problemCanvases = document.querySelectorAll(".problem-canvas")
    if (problemCanvases.length > 0 && window.THREE) {
      problemCanvases.forEach((canvas) => {
        const iconType = canvas.getAttribute("data-icon")
  
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  
        const renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          alpha: true,
          antialias: true,
        })
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  
        // Create different 3D objects based on icon type
        let object
  
        switch (iconType) {
          case "air":
            // Air quality icon - particles
            const particlesGeometry = new THREE.BufferGeometry()
            const particlesCount = 100
  
            const posArray = new Float32Array(particlesCount * 3)
  
            for (let i = 0; i < particlesCount * 3; i++) {
              posArray[i] = (Math.random() - 0.5) * 3
            }
  
            particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
  
            const particlesMaterial = new THREE.PointsMaterial({
              size: 0.05,
              color: 0x6c63ff,
            })
  
            object = new THREE.Points(particlesGeometry, particlesMaterial)
            break
  
          case "vr":
            // VR headset - box
            const boxGeometry = new THREE.BoxGeometry(1.5, 1, 0.8)
            const boxMaterial = new THREE.MeshBasicMaterial({
              color: 0x6c63ff,
              wireframe: true,
            })
            object = new THREE.Mesh(boxGeometry, boxMaterial)
            break
  
          case "cartoon":
            // Cartoon character - sphere with eyes
            const group = new THREE.Group()
  
            const headGeometry = new THREE.SphereGeometry(1, 16, 16)
            const headMaterial = new THREE.MeshBasicMaterial({
              color: 0x6c63ff,
              wireframe: true,
            })
            const head = new THREE.Mesh(headGeometry, headMaterial)
            group.add(head)
  
            object = group
            break
  
          case "attendance":
            // Attendance - checkmark
            const checkGroup = new THREE.Group()
  
            const checkGeometry1 = new THREE.BoxGeometry(0.2, 1, 0.2)
            const checkMaterial = new THREE.MeshBasicMaterial({
              color: 0x6c63ff,
            })
            const check1 = new THREE.Mesh(checkGeometry1, checkMaterial)
            check1.position.set(-0.4, 0, 0)
            check1.rotation.z = Math.PI / 4
            checkGroup.add(check1)
  
            const checkGeometry2 = new THREE.BoxGeometry(0.2, 1.5, 0.2)
            const check2 = new THREE.Mesh(checkGeometry2, checkMaterial)
            check2.position.set(0.4, -0.3, 0)
            check2.rotation.z = -Math.PI / 4
            checkGroup.add(check2)
  
            object = checkGroup
            break
  
          case "voice":
            // Voice assistance - wave
            const waveGroup = new THREE.Group()
  
            for (let i = 0; i < 3; i++) {
              const radius = 0.5 + i * 0.4
              const arcGeometry = new THREE.TorusGeometry(radius, 0.05, 16, 32, Math.PI)
              const arcMaterial = new THREE.MeshBasicMaterial({
                color: 0x6c63ff,
                wireframe: true,
              })
              const arc = new THREE.Mesh(arcGeometry, arcMaterial)
              arc.rotation.x = Math.PI / 2
              arc.rotation.y = Math.PI / 2
              waveGroup.add(arc)
            }
  
            object = waveGroup
            break
  
          case "health":
            // Health - heart
            const heartShape = new THREE.Shape()
  
            heartShape.moveTo(0, 0)
            heartShape.bezierCurveTo(0, -0.5, -1, -1, -2, 0)
            heartShape.bezierCurveTo(-3, 1, -3, 2, 0, 3)
            heartShape.bezierCurveTo(3, 2, 3, 1, 2, 0)
            heartShape.bezierCurveTo(1, -1, 0, -0.5, 0, 0)
  
            const heartGeometry = new THREE.ShapeGeometry(heartShape)
            const heartMaterial = new THREE.MeshBasicMaterial({
              color: 0x6c63ff,
              wireframe: true,
              side: THREE.DoubleSide,
            })
            object = new THREE.Mesh(heartGeometry, heartMaterial)
            object.scale.set(0.3, 0.3, 0.3)
            break
  
          case "deepfake":
            // Deepfake - two overlapping faces
            const faceGroup = new THREE.Group()
  
            const face1Geometry = new THREE.CircleGeometry(1, 32)
            const face1Material = new THREE.MeshBasicMaterial({
              color: 0x6c63ff,
              wireframe: true,
              side: THREE.DoubleSide,
            })
            const face1 = new THREE.Mesh(face1Geometry, face1Material)
            face1.position.set(-0.3, 0, 0)
            faceGroup.add(face1)
  
            const face2Geometry = new THREE.CircleGeometry(1, 32)
            const face2Material = new THREE.MeshBasicMaterial({
              color: 0x00d9ff,
              wireframe: true,
              side: THREE.DoubleSide,
            })
            const face2 = new THREE.Mesh(face2Geometry, face2Material)
            face2.position.set(0.3, 0, 0)
            faceGroup.add(face2)
  
            object = faceGroup
            break
  
          default:
            // Default - sphere
            const geometry = new THREE.SphereGeometry(1, 16, 16)
            const material = new THREE.MeshBasicMaterial({
              color: 0x6c63ff,
              wireframe: true,
            })
            object = new THREE.Mesh(geometry, material)
        }
  
        scene.add(object)
  
        // Position camera
        camera.position.z = 5
  
        // Animation
        function animateProblemIcon() {
          requestAnimationFrame(animateProblemIcon)
  
          if (object) {
            object.rotation.x += 0.01
            object.rotation.y += 0.01
          }
  
          renderer.render(scene, camera)
        }
  
        animateProblemIcon()
      })
    }
  
    // Problem Statement Modal
    const viewDetailsButtons = document.querySelectorAll(".view-details-btn")
    const modal = document.getElementById("problemModal")
    const modalContent = document.getElementById("modalContent")
    const closeModal = document.querySelector(".close-modal")
  
    // Problem statements data
    const problemData = [
      {
        id: 1,
        title: "AirValue: Integrating Air Quality into Property Valuation",
        subtitle: "Helping buyers, sellers, and policymakers make smarter real estate decisions",
        description:
          "Property prices in India's cities(like Banglore) often ignore air quality, even though poor air leads to severe health risks and hidden living costs. This challenge asks participants to develop an model that adjusts property values based on AQI data and quantifies the health cost of pollution, helping buyers, sellers, and policymakers make smarter real estate decisions.",
        goals: [
          'Health Risk Detection – Create a model that calculates the "health risk" and "health cost premium(extra money people indirectly pay for living in polluted areas)" based on AQI.',
          "Price Detection – Build an algorithm that links Health cost premium with property value adjustments.",
          "User-Friendly System – A simple system where buyers, sellers, and policymakers can check real estate prices along with air quality impact.",
        ],
      },
      {
        id: 2,
        title: "Smart Navigation for BMSIT using AR/VR",
        subtitle: "Interactive campus navigation for students, visitors, and faculty",
        description:
          "New students, visitors, and even new faculty often struggle to find their way around the BMSIT campus. Traditional maps or signboards may not be enough, leading to confusion and wasted time. This challenge asks participants to build an AR/VR-based navigation system that provides an interactive, step-by-step guide to various locations within the campus.",
        goals: [
          "AR Navigation – Use Augmented Reality to overlay directions on the real-world view, guiding users to classrooms, labs, offices, etc.",
          "VR Tour – Create a Virtual Reality tour for remote users to explore the campus digitally.",
          "User-Friendly System – Ensure a simple, easy-to-use interface for students, visitors, and faculty.",
        ],
      },
      {
        id: 3,
        title: "AI-Powered 3D Cartoon Companion",
        subtitle: "Bringing cartoon characters to life with AR/VR and AI",
        description:
          "Children love their favourite cartoon characters but can only watch them on screens. What if they could interact with them in real-time?",
        goals: [
          "Your task is to build an AI-driven 3D character (e.g., Chhota Bheem) that comes to life using AR/VR.",
          'Users can talk to the character, ask questions like "Where is Dholakpur?" or "Who is Chutki?" and get real-time responses based on the character\'s story.',
        ],
      },
      {
        id: 4,
        title: "Smart Attendance Management for Colleges",
        subtitle: "Digital attendance system to save time and prevent fraud",
        description:
          "Teachers at Colleges are tired of manually calling out names and marking attendance, which is time-consuming and inefficient. This challenge asks participants to develop a smart attendance system where students can mark their attendance digitally while ensuring that they can't misuse it (e.g., marking attendance for friends or skipping class).",
        goals: [
          "Easy Attendance Marking – Students should be able to mark their attendance quickly using a mobile app, QR code, facial recognition, or another method.",
          "Fraud Prevention – Ensure students can't fake attendance (e.g., verifying they are physically present in class).",
          "Teacher Dashboard – A system where teachers automatically receive attendance records without manual effort.",
        ],
      },
      {
        id: 5,
        title: "AI-Powered Voice Assistance for the Visually Impaired",
        subtitle: "Helping visually impaired individuals understand their surroundings",
        description:
          "Visually impaired individuals rely on sound and smell to understand their surroundings, but in silent places, they struggle to know what's around them. Many of them don't speak English and find it difficult to use smartphones or open apps frequently. This challenge asks participants to develop an AI-powered voice assistant that uses image recognition and language translation to describe surroundings in their native language, activated just by pressing the power button.",
        goals: [
          "Hands-Free Activation – Users can simply press the power button to get assistance without opening an app.",
          "Image Recognition + AI – surroundings should get captured and its given to AI-powered vision models to Identify objects, people, and surroundings.",
          "Native Language Support – Use Any Translate API to describe surroundings in the user's own language.",
        ],
      },
      {
        id: 6,
        title: "Women's Health Data Analysis & Personalized Insights",
        subtitle: "Tracking and improving women's health with data-driven insights",
        description:
          "Women's health issues like maternal health, menstrual cycles, and mental well-being often go unnoticed due to a lack of awareness and data-driven insights. This challenge asks participants to develop a smart health analysis system where women can enter their own health data and receive personalized insights and predictions to track health trends and improve well-being.",
        goals: [
          "Personalized Health Tracking – Allow women to input their health data (e.g., menstrual cycles, symptoms, mood, medical history) for analysis.",
          "Predictive Models – Use AI/ML to detect patterns, predict health trends, and give recommendations.",
          "Data Visualization – Create a dashboard that displays insights like menstrual cycle trends, health risk alerts, and wellness tips.",
        ],
      },
      {
        id: 7,
        title: "Deepfake Detection & Analysis System",
        subtitle: "Identifying and analyzing AI-generated fake content",
        description:
          "AI-generated fake images and videos are becoming a major issue, spreading misinformation and damaging reputations. This challenge asks participants to build a Deepfake Detection System where users can upload images or videos to check if they are real or AI-generated. The system should analyze key factors like facial consistency, texture, lighting, and anomalies and provide clear visual insights (graphs or other formats). If fake, it should also justify why and allow users to download a deepfake analysis report.",
        goals: [
          "Deepfake Detection – Identify AI-generated or manipulated content from uploaded media.",
          "Clear Analysis – Explain results using graphs or other visual methods for texture, lighting, and inconsistencies.",
          "Report Generation – Provide a downloadable deepfake analysis report with reasoning.",
        ],
      },
    {
    id: 8,
    title: "IoT-Based Noise Pollution Monitoring & Analysis System",
    subtitle: "Real-time noise tracking for public awareness & authority alerts",
    description:
      "Bangalore faces rising noise pollution due to urbanization, traffic, and construction. Excessive noise impacts public health, yet real-time monitoring is lacking. This challenge asks participants to develop an IoT-based noise monitoring system that tracks, analyzes, and notifies both the public and authorities when noise crosses safe limits.",
    goals: [
      "Real-Time Monitoring – Deploy IoT noise sensors in key areas (traffic hotspots, construction zones, residential areas).",
      "Data Visualization – Web dashboard displaying real-time noise maps, trends, and historical insights of monitored areas.",
      "Alerts & Reports – Notify authorities & the public when limits exceed with noise analysis reports.",
      "Public Reporting – Citizens in key areas can report high noise levels via the website.",
      "NOTE: Authorities to Notify (via email or official websites) are KSPCB – Monitors and regulates environmental noise pollution ,BTP – Handles traffic-related noise violations (e.g., honking) , BBMP – Public Health & Environment Dept.** – Manages construction & public noise.",
    ],
  },
  {
    id: 9,
    title: "Open Innovation Challenge",
    subtitle: "Propose your own groundbreaking tech solution!",
    description:
      "This challenge is for those who want to **think outside the box!** If you have an innovative idea that doesn't fit into any listed categories, here’s your chance to pitch and build it.",
    goals: [
      "Originality – Your idea should be unique and solve a real-world problem.",
      "Feasibility – It should be practical, scalable, and impactful.",
      "Execution – Present a working prototype or proof of concept.",
    ],
  },
    ]
  
    // Open modal when a View Details button is clicked
    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.stopPropagation() // Prevent event bubbling
        const problemCard = this.closest(".problem-card")
        const problemId = problemCard.getAttribute("data-problem")
        const problem = problemData.find((p) => p.id == problemId)
  
        if (problem) {
          const modalHTML = `
            <h2 class="modal-problem-title">${problem.title}</h2>
            <p class="modal-problem-subtitle">${problem.subtitle}</p>
            
            <div class="modal-section">
              <h3>Problem Statement</h3>
              <p>${problem.description}</p>
            </div>
            
            <div class="modal-section">
              <h3>Goals</h3>
              <ul class="modal-goals">
                ${problem.goals.map((goal) => `<li>${goal}</li>`).join("")}
              </ul>
            </div>
          `
  
          modalContent.innerHTML = modalHTML
          modal.style.display = "block"
          document.body.style.overflow = "hidden"
        }
      })
    })
  
    // Close modal
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      })
    }
  
    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  
    // Declare variables to fix the errors
    let time
    let responses
    let based
    let on
    let the
    let character
  })
  
  
