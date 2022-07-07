


const tbody = document.getElementById("tbody");
const form = document.querySelector(".form");
const btnactualizar = document.querySelector(".actualizar");
const input = document.querySelectorAll(".content-form > input");
const inputmodal = document.querySelectorAll(".form_div > input");
const modal = document.querySelector(".modal-content");
const cerrar = document.querySelector(".cerrar");
let datos = {};

// LISTAR---------------------------
const listarcontactos = () => {
  fetch("/listar")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        const tr = document.createElement("tr");
        const tdnombre = document.createElement("td");
        const tdapellido = document.createElement("td");
        const tdtelefono = document.createElement("td");

        const tdacciones = document.createElement("td");
        const actualizar = document.createElement("i");
        const eliminar = document.createElement("i");

        actualizar.classList = "fa fa-pencil-square-o";
        eliminar.classList = "fa fa-trash-o";

        eliminar.addEventListener("click", () => {
          fetch(`/eliminar/${element[0]}`, {
            method: "DELETE",
          })
            .then((res) => res.text())
            .then((data) => {
              if (data != "error") {
                toastr.error("CONTACTO ELIMINADO", {
                  timeOut: "1000",
                  extendedTImeout: "0",
                });
                tbody.innerHTML = "";
                listarcontactos();
              } else {
                toastr.error("CONTACTO NO ENCONTRADO", {
                  timeOut: "1000",
                  extendedTImeout: "0",
                });
              }
            });
        });

        actualizar.addEventListener("click", () => {
          fetch(`/mostrar/${element[0]}`)
            .then((res) => res.json())
            .then((data) => {
              document.querySelector(".modal > .actualizar").id = data[0];
              document.querySelector(".form_div > .nombre").value = data[1];
              document.querySelector(".form_div > .apellido").value = data[2];
              document.querySelector(".form_div > .telefono").value = data[3];
              modal.classList.add("active");
            });
        });

        tdacciones.append(actualizar);
        tdacciones.append(eliminar);

        tdnombre.setAttribute('data-label','NOMBRE')
        tdapellido.setAttribute('data-label','APELLIDO')
        tdtelefono.setAttribute('data-label','TELEFONO')
        tdacciones.setAttribute('data-label','ACCIONES')

        tdnombre.innerHTML = element[1];
        tdapellido.innerHTML = element[2];
        tdtelefono.innerHTML = element[3];

        tr.append(tdnombre);
        tr.append(tdapellido);
        tr.append(tdtelefono);
        tr.append(tdacciones);

        tbody.append(tr);
      });
    });
};
listarcontactos();

// AGREGAR-----------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  input.forEach((el) => {
    datos[el.name] = el.value;
  });
  const datosjson = JSON.stringify(datos);

  fetch("/agregar", {
    method: "POST",
    body: datosjson,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((data) => {
      if (data == "nombre") {
        toastr.error(
          "El nombre debe tener maximo 20 digitos y todos deben ser letras",
          {
            timeOut: "1000",
            extendedTImeout: "0",
          }
        );
      } else if (data == "telefono") {
        toastr.error(
          "El telefono debe tener maximo 10 digitos y todos deben ser numeros",
          {
            timeOut: "1000",
            extendedTImeout: "0",
          }
        );
      } else {
        toastr.success("CONTACTO AGREGADO", {
          timeOut: "1000",
          extendedTImeout: "0",
        });
        document.querySelector('.nav-left').classList.remove('active')
        input.forEach((element) => {
          element.value = "";
        });
        tbody.innerHTML = "";
        listarcontactos();
      }
    });
});

// ACTUALIZAR-----------------------
btnactualizar.addEventListener("click", () => {
  inputmodal.forEach((element) => {
    datos[element.name] = element.value;
  });
  const dataupdate = JSON.stringify(datos);

  fetch(`/actualizar/${btnactualizar.id}`, {
    method: "PUT",
    body: dataupdate,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((data) => {
      if (data == "nombre") {
        toastr.error(
          "El nombre debe tener maximo 20 digitos y todos deben ser letras",
          {
            timeOut: "1000",
            extendedTImeout: "0",
          }
        );
      } else if (data == "telefono") {
        toastr.error(
          "El telefono debe tener maximo 10 digitos y todos deben ser numeros",
          {
            timeOut: "2000",
            extendedTImeout: "0",
          }
        );
      } else if (data == "error") {
        toastr.error("Contacto no encontrado", {
          timeOut: "1000",
          extendedTImeout: "0",
        });
      } else {
        toastr.success("CONTACTO ACTUALIZADO", {
          timeOut: "1000",
          extendedTImeout: "0",
        });
        modal.classList.remove("active");
        tbody.innerHTML = "";
        listarcontactos();
      }
    });
});

cerrar.addEventListener("click", () => {
  modal.classList.remove("active");
});

function toggle() {
  document.querySelector(".nav-left").classList.toggle("active");
}
