/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event
 */

import * as datafile from "./data.js";
import * as view from "./view.js";

const handleDragOver = (event) => {
  event.preventDefault();
  const path = event.path || event.composedPath();
  let column = null;

  for (const element of path) {
    const { area } = element.dataset;
    if (area) {
      column = area;
      break;
    }
  }

  if (!column) return;
  updateDragging({ over: column });
  updateDraggingHtml({ over: column });
};

const handleDragStart = (event) => {};
const handleDragEnd = (event) => {};

// 2. & 3. opens & closes helpoverlay
const handleHelpToggle = (event) => {
  if (view.html.help.overlay.open) {
    view.html.help.overlay.close();
    view.html.other.add.focus(); //4
  } else {
    view.html.help.overlay.show();
  }
};

//5. & 6. Opens & closes addorder overlay & 8. resets form to blank after adding or cancelling order
const handleAddToggle = (event) => {
  if (view.html.add.overlay.open) {
    view.html.add.overlay.close();
    view.html.other.add.focus(); //4
  } else {
    view.html.add.overlay.show();
    view.html.add.form.reset();
  }
};

// 7. Adds order to html element
const handleAddSubmit = (event) => {
  event.preventDefault();
  const title = view.html.add.title.value;
  const table = view.html.add.table.value;
  const order = datafile.createOrderData({ title, table, column: "ordered" });
  datafile.state.orders[order.id] = order;
  const orderElement = view.createOrderHtml(order);
  view.html.columns.ordered.appendChild(orderElement);
  view.html.add.overlay.close();
};

// 9. & 10 Edit Order Overlay opens & closes without changes
const handleEditToggle = (event) => {
  if (view.html.edit.overlay.open) {
    view.html.edit.overlay.close();
  } else {
    view.html.edit.overlay.show();
  }
};

//12. update edit submition & 13. append columns to order/prep/serve
const handleEditSubmit = (event) => {
  event.preventDefault();
  const order = document.querySelector(".order");
  order.remove();

  const title = view.html.edit.title.value;
  const table = view.html.edit.table.value;
  const column = view.html.edit.column.value;
  const orderEdit = datafile.createOrderData({ title, table, column });
  datafile.state.orders[orderEdit.id] = orderEdit;
  const orderElement = view.createOrderHtml(orderEdit);
  view.html.columns[column].appendChild(orderElement);
  view.html.edit.overlay.close();
};

//11. deletes order
const handleDelete = (event) => {
  const { target } = event;
  if (target == view.html.edit.delete) {
    document.querySelector(".order").remove();
  }
  view.html.edit.overlay.close();
};

view.html.add.cancel.addEventListener("click", handleAddToggle);
view.html.other.add.addEventListener("click", handleAddToggle);
view.html.add.form.addEventListener("submit", handleAddSubmit);

view.html.other.grid.addEventListener("click", handleEditToggle);
view.html.edit.cancel.addEventListener("click", handleEditToggle);
view.html.edit.form.addEventListener("submit", handleEditSubmit);
view.html.edit.delete.addEventListener("click", handleDelete);

view.html.other.help.addEventListener("click", handleHelpToggle);
view.html.help.cancel.addEventListener("click", handleHelpToggle);

for (const htmlColumn of Object.values(view.html.columns)) {
  htmlColumn.addEventListener("dragstart", handleDragStart);
  htmlColumn.addEventListener("dragend", handleDragEnd);
}

for (const htmlArea of Object.values(view.html.area)) {
  htmlArea.addEventListener("dragover", handleDragOver);
}

/**
1.The “Add Order” button should start as focused, meaning space/enter can be pressed immediately to add an order.

2. Click the “?” icon should open a “Help” overlay that provides instructions on how to use the app.
3. If the “Help” overlay is open, clicking the “Close” button should remove the overlay.

4. If any overlay is closed the focus should be returned to the “Add Order” button.

5. Clicking “Add Order” should open an “Add Order” overlay that allows the entering of order text and an associated table.
6. Clicking “Cancel” in the “Add Order” overlay should remove the overlay without adding the information as an order.

7. Clicking the “Add” button in the “Add Order” overlay should remove the overlay and add a new order to the “Ordered” column.

8. If the “Add Order” overlay is closed (either with “Cancel” or “Add”) and it is opened again it should be blank (not have information from the last time it was opened).

9. If an order has been added and it is clicked on the “Edit Order” overlay should appear.

11. If the “Delete” button is pressed in the Edit Order overlay the overlay should be closed and the order should be removed entirely.

10. If the “Cancel” button is pressed in the “Edit Order” overlay it should close the overlay without applying the changes entered into the overlay inputs.

12. If the “Update” button is pressed in the “Edit Order” overlay it should close the overlay and apply the changes entered to the relevant order.

13.If the “Status” value is changed and “Update” is pressed in the “Edit Order” overlay then the order should be moved to the column selected in the dropdown.
 */
