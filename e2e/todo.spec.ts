import { test, expect } from '@playwright/test';

test.describe('Todo List App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('full page screenshot matches baseline', async ({ page }) => {
    await expect(page).toHaveScreenshot('todo-full-page.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('renders 3 initial todo items', async ({ page }) => {
    const items = page.getByTestId('todo-list').locator('.todo-item');
    await expect(items).toHaveCount(3);

    await expect(page.getByTestId('todo-item-1')).toContainText('Buy groceries');
    await expect(page.getByTestId('todo-item-2')).toContainText('Walk the dog');
    await expect(page.getByTestId('todo-item-3')).toContainText('Read a book');
  });

  test('second item is pre-checked (completed)', async ({ page }) => {
    await expect(page.getByTestId('todo-checkbox-2')).toBeChecked();
    await expect(page.getByTestId('todo-item-2')).toHaveClass(/completed/);
  });

  test('remaining count shows 2 tasks', async ({ page }) => {
    await expect(page.getByTestId('remaining-count')).toHaveText('2 tasks remaining');
  });

  test('screenshot of initial state with correct items', async ({ page }) => {
    const list = page.getByTestId('todo-list');
    await expect(list).toHaveScreenshot('todo-list-initial.png', {
      animations: 'disabled',
    });
  });

  test('can toggle a todo item and screenshot reflects change', async ({ page }) => {
    await page.getByTestId('todo-checkbox-1').click();
    await expect(page.getByTestId('todo-item-1')).toHaveClass(/completed/);
    await expect(page.getByTestId('remaining-count')).toHaveText('1 task remaining');

    await expect(page.getByTestId('todo-list')).toHaveScreenshot('todo-list-after-toggle.png', {
      animations: 'disabled',
    });
  });

  test('can add a new todo item', async ({ page }) => {
    await page.getByTestId('new-todo-input').fill('Write tests');
    await page.getByTestId('add-todo-btn').click();

    const items = page.getByTestId('todo-list').locator('.todo-item');
    await expect(items).toHaveCount(4);
    await expect(page.getByTestId('remaining-count')).toHaveText('3 tasks remaining');

    await expect(page).toHaveScreenshot('todo-after-add.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('can delete a todo item', async ({ page }) => {
    await page.getByTestId('delete-btn-2').click();

    const items = page.getByTestId('todo-list').locator('.todo-item');
    await expect(items).toHaveCount(2);

    await expect(page).toHaveScreenshot('todo-after-delete.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('empty input does not add a todo', async ({ page }) => {
    await page.getByTestId('add-todo-btn').click();
    const items = page.getByTestId('todo-list').locator('.todo-item');
    await expect(items).toHaveCount(3);
  });
});
