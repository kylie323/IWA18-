# App Instructions

This document provides instructions for using the app and an overview of its functionality.

## Event Handlers

### `handleDragOver(event)`

A handler that fires when a user drags over any element inside a column. In order to determine which column the user is dragging over, the entire event bubble path is checked with `event.path` (or `event.composedPath()` for browsers that don't support `event.path`). The bubbling path is looped over until an element with a `data-area` attribute is found. Once found, both the active dragging column is set in the `state` object in "data.js" and the HTML is updated to reflect the new column.

### `handleDragStart(event)`

A handler for drag start events.

### `handleDragEnd(event)`

A handler for drag end events.

### `handleHelpToggle(event)`

Opens or closes the help overlay when the "?" icon is clicked.

### `handleAddToggle(event)`

Opens or closes the "Add Order" overlay when the "Add Order" button is clicked. If the overlay is open, clicking "Cancel" will close it without adding the information as an order.

### `handleAddSubmit(event)`

Adds a new order to the "Ordered" column when the "Add" button in the "Add Order" overlay is clicked. It also resets the form to blank after adding or canceling an order.

### `handleEditToggle(event)`

Opens or closes the "Edit Order" overlay when an order is clicked. The overlay allows for editing order details.

### `handleEditSubmit(event)`

Applies changes entered in the "Edit Order" overlay and closes the overlay. If the "Status" value is changed, the order is moved to the selected column in the dropdown.

### `handleDelete(event)`

Deletes the order and closes the "Edit Order" overlay when the "Delete" button is pressed.

## User Interface Interactions

1. The "Add Order" button starts as focused, allowing users to press space/enter immediately to add an order.

2. Clicking the "?" icon opens the "Help" overlay with instructions on how to use the app.

3. If the "Help" overlay is open, clicking the "Close" button removes the overlay.

4. When any overlay is closed, the focus is returned to the "Add Order" button.

5. Clicking "Add Order" opens the "Add Order" overlay for entering order text and associated table.

6. Clicking "Cancel" in the "Add Order" overlay removes the overlay without adding the order.

7. Clicking "Add" in the "Add Order" overlay removes the overlay and adds a new order to the "Ordered" column.

8. If the "Add Order" overlay is closed (either with "Cancel" or "Add"), it opens as a blank form when opened again.

9. Clicking an added order opens the "Edit Order" overlay for editing order details.

10. Clicking "Cancel" in the "Edit Order" overlay closes the overlay without applying changes.

11. Clicking "Delete" in the "Edit Order" overlay deletes the order and closes the overlay.

12. Clicking "Update" in the "Edit Order" overlay closes the overlay and applies changes to the relevant order.

13. If the "Status" value is changed and "Update" is pressed in the "Edit Order" overlay, the order is moved to the selected column.

