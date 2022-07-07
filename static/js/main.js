const domId = (element) => {
  return document.getElementById(element);
};
const domElem = (element) => {
  return document.querySelector(element);
};
const message = (message, type) => {
  toastr.options = {
    showMethod: "slideDown",
    progressBar: true,
    timeOut: "1500",
    positionClass: "toast-top-right",
  };
  if (type == "success") {
    return toastr.success(message);
  }
  if (type == "error") {
    return toastr.error(message);
  }
  if (type == "warning") {
    return toastr.warning(message);
  }
};
domElem(".cerrar").addEventListener("click", () => {
  domElem(".modal-content").classList.remove("active");
});
function toggle() {
  domElem(".nav-left").classList.toggle("active");
}
const nav = () => {
  domElem(".nav-left").classList.remove("active");
  domElem(".modal-content").classList.remove("active");
  domElem(".form").reset();
};
// ------------------------
// --LISTAR CONTACTO
// -------------------------
const listarcontactos = () => {
  fetch("/listar")
    .then((res) => res.json())
    .then((data) => {
      domId("tbody").innerHTML = "";
      data.forEach((element) => {
        const template = domId("usetemplate").content.cloneNode(true);
        const updateUser = template.querySelectorAll(".option > i")[0];
        const deleteUser = template.querySelectorAll(".option > i")[1];
        template.querySelectorAll("td")[0].innerHTML = element[1];
        template.querySelectorAll("td")[1].innerHTML = element[2];
        template.querySelectorAll("td")[2].innerHTML = element[3];
        domId("tbody").appendChild(template);

        deleteUser.addEventListener("click", () => {
          fetch(`/eliminar/${element[0]}`, {
            method: "DELETE",
          })
            .then((res) => res.text())
            .then((data) => {
              data == "error"
                ? message("CONTACTO NO ENCONTRADO", "error")
                : (message("CONTACTO ELIMINADO", "error"), listarcontactos());
            });
        });

        updateUser.addEventListener("click", () => {
          domElem(".modal > .actualizar").id = element[0];
          domElem(".form_div > .nombre").value = element[1];
          domElem(".form_div > .apellido").value = element[2];
          domElem(".form_div > .telefono").value = element[3];
          domElem(".modal-content").classList.add("active");
        });
      });
    });
};
listarcontactos();
// ------------------------
// --AGREGAR CONTACTO
// -------------------------
domElem(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formdata = Object.fromEntries(new FormData(e.target));
  const datosjson = JSON.stringify(formdata);

  fetch("/agregar", {
    method: "POST",
    body: datosjson,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((data) => {
      data == "nombre"
        ? message(
            "El nombre debe tener maximo 20 digitos y todos deben ser letras",
            "error"
          )
        : data == "telefono"
        ? message(
            "El telefono debe tener maximo 10 digitos y todos deben ser numeros",
            "error"
          )
        : (message("CONTACTO AGREGADO", "success"), listarcontactos(), nav());
      listarcontactos();
    });
});
// ------------------------
// --ACTUALIZAR CONTACTO
// -------------------------
domElem(".modal").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = domElem(".modal > .actualizar").id;
  const formdata = Object.fromEntries(new FormData(e.target));
  const dataupdate = JSON.stringify(formdata);
  fetch(`/actualizar/${id}`, {
    method: "PUT",
    body: dataupdate,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((data) => {
      data == "nombre"
        ? message(
            "El nombre debe tener maximo 20 digitos y todos deben ser letras",
            "error"
          )
        : data == "telefono"
        ? message(
            "El telefono debe tener maximo 10 digitos y todos deben ser numeros",
            "error"
          )
        : data == " error"
        ? message("Contacto no encontrado", "error")
        : (message("CONTACTO ACTUALIZADO", "success"),
          listarcontactos(),
          nav());
    });
});
