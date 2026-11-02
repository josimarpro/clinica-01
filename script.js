
document.addEventListener("DOMContentLoaded", () => {

  // MENU HAMBÚRGUER
  
const menuHamburguer = document.querySelector(".menu-toggle");

const menu = document.querySelector(".menu-links");

if (menuHamburguer && menu) {


    menuHamburguer.addEventListener("click", () => {


     menu.classList.toggle("open");

     const aberto = menu.classList.contains("open");

      menuHamburguer.setAttribute(
        "aria-expanded",
        String(aberto)
      );
    });

    // FECHAR MENU AO CLICAR EM UM LINK
    const linksMenu = menu.querySelectorAll("a");

    linksMenu.forEach((link) => {
      link.addEventListener("click", () => {
      menu.classList.remove("open");
        menuHamburguer.classList.remove("ativo");

        menuHamburguer.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
  }

  // ROLAGEM SUAVE ENTRE AS SEÇÕES
  const linksInternos = document.querySelectorAll(
    'a[href^="#"]'
  );

  linksInternos.forEach((link) => {
    link.addEventListener("click", (evento) => {

      const destino = link.getAttribute("href");

      if (!destino || destino === "#") return;

      const secao = document.getElementById(
        destino.substring(1)
      );

      if (secao) {
        evento.preventDefault();

        secao.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ANIMAÇÃO DAS FOTOS DAS GALERIAS
  const fotos = document.querySelectorAll(
    ".galeria img"
  );

  if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {

          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
          }

        });
      },
      {
        threshold: 0.1
      }
    );

    fotos.forEach((foto) => {
      observador.observe(foto);
    });

  } else {
    fotos.forEach((foto) => {
      foto.classList.add("visivel");
    });
  }

});

// GALERIAS DAS 3 CLÍNICAS

function carregarFotos(idGaleria, pasta, quantidade) {
  const galeria = document.getElementById(idGaleria);

  if (!galeria) return;

  for (let i = 1; i <= quantidade; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");

   img.src = `img/${pasta}/foto${i}.jpeg`;
    img.alt = `Foto ${i} da clínica`;
    img.loading = "lazy";

    figure.appendChild(img);
    galeria.appendChild(figure);
  }
}

// ALTERE A QUANTIDADE DE FOTOS DE CADA CLÍNICA



const clinicas = [
  {
    id: "fotos-clinica1",
    pasta: "UNIDADE NOVA ALIANÇA SANTA LUZIA MG",
    total: 31
  },
  {
    id: "fotos-clinica2",
    pasta: "UNIDADE NOVA VIDA SAO JOSE DA LAPA MG",
    total: 26
  },
  {
    id: "fotos-clinica3",
    pasta: "UNIDADE REVIVER CONTAGEM MG",
    total: 17
  }
];

document.addEventListener("DOMContentLoaded", () => {
  clinicas.forEach((clinica) => {
    carregarFotos(
      clinica.id,
      clinica.pasta,
      clinica.total
    );
  });
});

