# About

Прием данных в Google SpreadSheet

# Example usage

### 1. Добавить `script.js` в Extensions/Apps Script таблицы

### 2. Записать ID таблицы из ее URL

Например, для `https://docs.google.com/spreadsheets/d/1xnHT_I8f0-r6Wq6sB-b2IxIVIjacnYuFO25My3I01ow/edit#gid=0`, ID будет = `1xnHT_I8f0-r6Wq6sB-b2IxIVIjacnYuFO25My3I01ow`

### 3. При необходимости проставить наименования столбцов

Нужно, чтобы позиция `("B"+n)` входных данных `e.parameter.name` совпадала с позицией в таблице `("B1")`.
Названия столбцов должны соответствовать названиям переменных с данными, отправляемых с лендинга

### 4. Сохранить проект, опубликовать скрипт. Тип развертывания - веб приложение, доступ - открытый

### 5. Если нужно обновить/поправить задеплоенный скрипт: сохранить новую версию в управление развертываниями. ID остается прежним
