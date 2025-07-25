function judgement () {
    if (ichia + step > goal || ichib + step > goal) {
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
        if (ichia == ichib) {
            watchfont.showIcon(
            "00000",
            "01010",
            "11111",
            "01010",
            "00000"
            )
            shuryo(colorboth)
        } else if (ichia + step >= goal) {
            watchfont.showIcon(
            "00100",
            "01000",
            "11111",
            "01000",
            "00100"
            )
            shuryo(colora)
        } else {
            watchfont.showIcon(
            "00100",
            "00010",
            "11111",
            "00010",
            "00100"
            )
            shuryo(colorb)
        }
    }
}
function tenmetsu () {
    neoPixel.setBrightness(0)
    basic.pause(500)
    neoPixel.show()
    neoPixel.setBrightness(akarusa)
    basic.pause(500)
    neoPixel.show()
}
input.onButtonPressed(Button.A, function () {
    shokika()
    mode = 2
    for (let カウンター = 0; カウンター <= 2; カウンター++) {
        music.play(music.tonePlayable(440, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
        watchfont.showNumber(3 - カウンター)
        tenmetsu()
    }
    music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    mode = 1
    watchfont.showNumber(0)
    basic.pause(1000)
    basic.clearScreen()
})
function countUp () {
    if (p1 != oldp1) {
        if (p1 == 0) {
            ichia += step
        }
        oldp1 = p1
    }
    if (p2 != oldp2) {
        if (p2 == 0) {
            ichib += step
        }
        oldp2 = p2
    }
}
function Penalty () {
    if (p1 == 0) {
        ichia = 0
    }
    if (p2 == 0) {
        ichib = 0
    }
}
function tenmetsuAll (color: number) {
    neoPixel.showColor(color)
    neoPixel.show()
    basic.pause(500)
    neoPixel.showColor(neopixel.colors(NeoPixelColors.Black))
    neoPixel.show()
    basic.pause(500)
}
function shuryo (color: number) {
    for (let index = 0; index < 5; index++) {
        if (mode != 1) {
            return
        }
        tenmetsuAll(color)
    }
    mode = 0
    shokika()
}
function neoDisp () {
    neoPixel.showColor(neopixel.colors(NeoPixelColors.Black))
    if (ichia == ichib) {
        for (let カウンター2 = 0; カウンター2 <= step - 1; カウンター2++) {
            neoPixel.setPixelColor(ichia + カウンター2, colorboth)
        }
    } else {
        for (let カウンター3 = 0; カウンター3 <= step - 1; カウンター3++) {
            neoPixel.setPixelColor(ichia + カウンター3, colora)
            neoPixel.setPixelColor(ichib + カウンター3, colorb)
        }
    }
    neoPixel.show()
}
input.onButtonPressed(Button.B, function () {
    step += 1
    if (step > maxStep) {
        step = 1
    }
    watchfont.showNumber(step)
    shokika()
})
function shokika () {
    neoPixel.showColor(neopixel.colors(NeoPixelColors.Black))
    basic.clearScreen()
    mode = 0
    ichia = startPoint
    ichib = startPoint
    oldp1 = 1
    oldp2 = 1
}
let oldp2 = 0
let p2 = 0
let oldp1 = 0
let p1 = 0
let mode = 0
let ichib = 0
let ichia = 0
let startPoint = 0
let step = 0
let maxStep = 0
let colorboth = 0
let colorb = 0
let colora = 0
let akarusa = 0
let goal = 0
let neoPixel: neopixel.Strip = null
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
neoPixel = neopixel.create(DigitalPin.P0, 27, NeoPixelMode.RGB)
goal = neoPixel.length() - 1
akarusa = 128
neoPixel.setBrightness(akarusa)
colora = neopixel.colors(NeoPixelColors.Red)
colorb = neopixel.colors(NeoPixelColors.Green)
colorboth = neopixel.colors(NeoPixelColors.Yellow)
maxStep = 1
step = 1
startPoint = 8
watchfont.showNumber(step)
shokika()
basic.forever(function () {
    p1 = pins.digitalReadPin(DigitalPin.P1)
    p2 = pins.digitalReadPin(DigitalPin.P2)
    if (mode == 1) {
        countUp()
        judgement()
    } else if (mode == 2) {
        Penalty()
    } else {
        if (input.runningTime() % 1000 <= 100) {
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
        } else {
            basic.clearScreen()
        }
    }
    neoDisp()
    watchfont.plotBrightness(0, 2, (1 - p1) * 255)
    watchfont.plotBrightness(4, 2, (1 - p2) * 255)
})
