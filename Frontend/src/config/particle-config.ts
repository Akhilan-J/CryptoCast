const particleConfig = {
  particles: {
    number: {
      value: 1000000,
      density: {
        enable: true,
        area: 1000000,
      },
    },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 10, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 1,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
    },
    size: {
      value: 10,
      random: true,
      anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
    },
    links: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
      bounce: true,
      attract: { enable: false, rotateX: 600, rotateY: 600 },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
      onClick: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        links: { opacity: 1 },
      },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3,
      },
      repulse: { distance: 400, duration: 0.4 },
      push: { quantity: 4 },
      remove: { quantity: 2 },
    },
  },
  background: { color: "#000000" },
  fullScreen: { enable: false },
};

export default particleConfig;
