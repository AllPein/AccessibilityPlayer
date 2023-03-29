# Web video player for True Tech hack MTS!

Веб-версия плеера для людей с ограниченными возможностями

## Как запустить

Склонируйте репозиторий

```
git clone https://github.com/AllPein/mts-hack-client
```

Установите зависимости

```
yarn
```

Создайте .env файл, скопируйте в него содержимое .env.example, заполните BACKEND_URL (можно собрать локально https://github.com/Dronicho/true-tech-hack)


Запустите командой

```
yarn serve
```

Это запустит webpack dev server на 3000 порту, и вы сможете пользоваться плеером (при запущенном бекенде).

## Архитектура

Приложение использует классическую клиент-серверную архитектуру

![image](https://user-images.githubusercontent.com/35956979/228590329-1ac9454f-cd35-4630-ac8b-fb7b3eea890c.png)

Сервер отдает ссылку на видео в формате dash и конфиг для установки визуальных эффектов конкретно для этого видео.
Пример отдаваемого конфига:
```
{
  "video_name": "output",
  "accessibility_config": [
    {
      "startTime": 12,
      "endTime": 16,
      "actions": [
        "lowerContrast",
        "blur"
      ]
    },
    {
      "startTime": 16,
      "endTime": 18,
      "actions": [
        "lowerContrast"
      ]
    },
    {
      "startTime": 18,
      "endTime": 21,
      "actions": [
        "lowerContrast",
        "screamer"
      ]
    },
    {
      "startTime": 26,
      "endTime": 30,
      "actions": [
        "lowerContrast",
        "blur"
      ]
    },
    {
      "startTime": 32,
      "endTime": 38,
      "actions": [
        "lowerSaturation"
      ]
    }
  ]
}
```

## Фичи

1. Понижение яркости в сценах, которые могут вызвать эпилептический припадок (распознование эпилептогенных шаблонов)
2. Распознование насыщенного красного и понижение контрастности в сценах, содержащих его
3. Размытие экрана в сценах 18+ (детский контроль)
4. Предупреждение о вспышках (яркие вспышки, скримеры в ужастиках и т.д.) за 5 секунд до ее появления

<img width="839" alt="image" src="https://user-images.githubusercontent.com/35956979/228519724-85e3bc82-9e39-4eeb-8425-990820290c58.png">

5. Возможность "на лету" включать/отключать функциональность

<img width="855" alt="Screenshot 2023-03-29 at 16 18 37" src="https://user-images.githubusercontent.com/35956979/228521485-7dc64042-2275-46f3-80e4-b6a956c8d628.png">


