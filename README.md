# Проект "Учет финансов"


## Стэк : TS / React / MobX / FireBase

___

## Скрипты


### `npm start`

Запуск проекта в браузере на  \
 [http://localhost:3000](http://localhost:3000).

___


### `npm run build`

Создаёт папку  `build` с приложением для деплоя.

Сборка проводится с  учётом оптимизации для достижения лучше производительности

___

## Архитектура приложения

> src
>> app
>>> pages
>>>> widgets
>>>>>features
>>>>>>shared

___

## App
Главный слой , в котором собираются все остальные слои.
Содержит файл App.tsx

## Pages
Готовые страницы приложения

## Widgets

Компоненты страницы приложения , на них собирается страницы.

## Features

Компоненты взаимодействия клиента с UI . Содержат логику

## Shared

Общий слой для всего приложения . Содержит стейт-менеджер , работу с Api и другой общий функционал.
