export function enableCellNavigation() {
  const arrow = { left: 37, up: 38, right: 39, down: 40 };

  function handleKeyPress(e: KeyboardEvent) {
    if (![arrow.left, arrow.up, arrow.right, arrow.down].includes(e.keyCode)) {
      return;
    }
    const targetInput = e.target as HTMLInputElement;
    const closestTd = targetInput.closest('td') as HTMLTableCellElement | null;
    let moveTo: HTMLTableCellElement | null = null;

    switch (e.keyCode) {
      case arrow.left:
        if (targetInput.selectionStart === 0) {
          moveTo = closestTd?.previousElementSibling as HTMLTableCellElement;
        }
        break;
      case arrow.right:
        if (targetInput.selectionEnd === targetInput.value.length) {
          moveTo = closestTd?.nextElementSibling as HTMLTableCellElement;
        }
        break;
      case arrow.up:
      case arrow.down:
        const row = closestTd?.closest('tr') as HTMLTableRowElement | null;
        const cellIndex = closestTd?.cellIndex ?? 0;

        let nextRow: HTMLTableRowElement | null = null;
        if (e.keyCode === arrow.down) {
          nextRow = row?.nextElementSibling as HTMLTableRowElement;
        } else if (e.keyCode === arrow.up) {
          nextRow = row?.previousElementSibling as HTMLTableRowElement;
        }

        if (nextRow) {
          moveTo = nextRow.cells[cellIndex] as HTMLTableCellElement;
        }
        break;
    }

    if (moveTo && moveTo instanceof Element) {
      e.preventDefault();

      moveTo.querySelectorAll('input, textarea').forEach((element: Element, index: number, elements: NodeListOf<Element>) => {
        const inputEl = element as HTMLInputElement | HTMLTextAreaElement;
        inputEl.focus();
        inputEl.select();
      });
    }
  }

  function setupNavigableTable() {
    return document.querySelectorAll<HTMLInputElement>('input').forEach((input: HTMLInputElement) => {
      input.addEventListener('keydown', handleKeyPress);
    });
  }

  function cleanupNavigableTable() {
    return document.querySelectorAll<HTMLInputElement>('input').forEach((input: HTMLInputElement) => {
      input.removeEventListener('keydown', handleKeyPress);
    });
  }

  return {
    setupNavigableTable,
    cleanupNavigableTable
  };
}
