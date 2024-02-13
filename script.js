const app = {
  init() {
    app.render();
  },

  state: [{
      label: 'Arroser le chien',
      done: false
    },
    {
      label: 'Sortir la voiture',
      done: true
    },
    {
      label: 'Laver les plantes',
      done: false
    }
  ],

  render() {
    app.rootElm = document.querySelector('.app');

    app.rootElm.textContent = '';

    app.formElm = app.createForm();
    app.counterElm = app.createCounter(app.state.length);
    app.listElm = app.createList(app.state);

    app.rootElm.append(app.formElm, app.counterElm, app.listElm);

  },

  createForm() {

    const inputElm = app.configureElement("input", {
      type: "text",
      className: "form-item",
      placeholder: "ajouter une tâche",
    })

    const formElm = app.configureElement("form", {
      className: "form",
      method: "get",
      name: "label",
    }, [
      inputElm
    ])

    formElm.addEventListener('keypress', app.handleSubmit);

    return formElm;
  },

  createCounter(taskNb) {

    const text = app.getCounterTitle(taskNb);

    const counterElm = app.configureElement('p', {
      className: "counter",
    }, [text]);

    return counterElm;
  },

  getCounterTitle(number) {
    if (number === 0) {
      return 'Aucune tâche en cours';
    }
    if (number === 1) {
      return `1 tâche en cours`;
    }
    return `${number} tâches en cours`;
  },


  createList(tasks) {

    const tasksElm = tasks.map((task) => {

      if (task.done == false) {

        const checkElm = app.configureElement('input', {
          type: "checkbox",
          className: "list-item--checkbox"
        });

        const spanElm = app.configureElement('span', {
          className: "list-item--span",
          textContent: task.label,
        });

        const divElm = app.configureElement('div', {
          className: "list-item--div",
        }, [checkElm, spanElm]);

        const deleteElm = app.configureElement('span', {
          className: "list-item--delete",
          textContent: "X",
        });

        deleteElm.addEventListener('click', app.handleDelete)

        const liElm = app.configureElement('li', {
          className: "list-item",
        }, [divElm, deleteElm]);

        liElm.addEventListener('click', app.handleCheck)

        return liElm;

      } else {

        const checkElm = app.configureElement('input', {
          type: "checkbox",
          className: "list-item--checkbox",
        })
        checkElm.checked = "checked";

        const spanElm = app.configureElement('span', {
          className: "list-item--span",
          textContent: task.label,
        });

        const divElm = app.configureElement('div', {
          className: "list-item--div",
        }, [checkElm, spanElm]);

        const deleteElm = app.configureElement('span', {
          className: "list-item--delete",
          textContent: "X",
        });

        deleteElm.addEventListener('click', app.handleDelete)

        const liElm = app.configureElement('li', {
          className: "list-item list-item--done",
        }, [divElm, deleteElm]);

        liElm.addEventListener('click', app.handleCheck)

        return liElm;
      }

    })

    const ulElm = app.configureElement('ul', {
      className: "list",
    }, [...tasksElm])

    return ulElm;
  },

  handleCheck(event) {
    const inputElm = event.currentTarget;

    const ulElm = inputElm.closest('ul');
    const ulArray = Array.from(ulElm.children);
    const inputIndex = ulArray.indexOf(inputElm);

    const state = app.state[inputIndex];

    if (state.done === false) {
      const newState = {
        done: true
      }
      Object.assign(state, newState)

    } else if (state.done === true) {
      const newState = {
        done: false
      }
      Object.assign(state, newState)
    }

    app.render()

  },

  handleDelete(event) {
    const deleteElm = event.currentTarget;
    console.log(deleteElm);
    const liElm = deleteElm.closest('li');
    console.log(liElm);
    const ulElm = liElm.closest('ul');
    const ulArray = Array.from(ulElm.children);
    const deleteIndex = ulArray.indexOf(liElm);
    console.log(deleteIndex);

    app.state.splice(deleteIndex, deleteIndex)

    app.render()

  },

  handleSubmit(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const taskName = event.target.value;
      const newTask = {
        label: taskName,
        done: false
      };
      app.state.push(newTask);

      app.render()
    }
  },

  /**
   * Crée et configure un élément
   * @param {string} tag La balise de l'élément à créer
   * @param {object} [attributes={}] La liste des attributs de l'élément
   * @param {array|null} [children=null] Les enfants de l'élément
   * @returns {HTMLElement} L'élément configuré
   */
  configureElement(tag, attributes = {}, children) {
    const element = document.createElement(tag);
    for (const property in attributes) {
      element[property] = attributes[property];
    }
    if (children) {
      element.append(...children);
    }
    return element;
  },

};

document.addEventListener('DOMContentLoaded', app.init);