var PROJECT_PATH = "/Users/MKTz/Documents/TOUCHDESIGNER/projects/layer-lemonade-ia/edicao/premiere/Layer-Lemonade-IA-Reels.prproj";
var PRESET_PATH = "/Applications/Adobe Premiere Pro (Beta)/Adobe Premiere Pro (Beta).app/Contents/Settings/SequencePresets/Social/Social Media Portrait 9x16 30 fps.sqpreset";
var LOG_PATH = "/Users/MKTz/Documents/TOUCHDESIGNER/projects/layer-lemonade-ia/edicao/premiere/setup-log.txt";

var PRINTS = [
    "/Users/MKTz/Documents/TOUCHDESIGNER/projects/layer-lemonade-ia/assets/news-prints/2026-04-22/openai-images-2-0-mobile-full.png",
    "/Users/MKTz/Documents/TOUCHDESIGNER/projects/layer-lemonade-ia/assets/news-prints/2026-04-22/openai-system-card-mobile-full.png",
    "/Users/MKTz/Documents/TOUCHDESIGNER/projects/layer-lemonade-ia/assets/news-prints/2026-04-22/youtube-likeness-detection-mobile-full.png",
    "/Users/MKTz/Documents/TOUCHDESIGNER/projects/layer-lemonade-ia/assets/news-prints/2026-04-22/midjourney-version-mobile-full.png",
    "/Users/MKTz/Documents/TOUCHDESIGNER/projects/layer-lemonade-ia/assets/news-prints/2026-04-22/claude-support-mobile-full.png",
    "/Users/MKTz/Documents/TOUCHDESIGNER/projects/layer-lemonade-ia/assets/news-prints/2026-04-22/ap-teens-deepfake-victims-browser-mobile.png",
    "/Users/MKTz/Documents/TOUCHDESIGNER/projects/layer-lemonade-ia/assets/news-prints/2026-04-22/wired-deepfake-schools-browser-mobile.png"
];

var SEQUENCES = [
    {
        name: "SEQ_2026-04-22_GPT_IMAGES_2_0",
        placements: [
            { file: "openai-images-2-0-mobile-full.png", time: 5 },
            { file: "openai-images-2-0-mobile-full.png", time: 39 }
        ],
        markers: [
            { time: 0, comment: "A-roll: hook - Images 2.0 ficou util" },
            { time: 5, comment: "Print: OpenAI Images 2.0 titulo e data" },
            { time: 12, comment: "A-roll: cenario 1 - thumb ou cartaz" },
            { time: 27, comment: "A-roll: cenario 2 - storyboard ou slide" },
            { time: 39, comment: "Print: mini tutorial - assunto, composicao, texto" },
            { time: 55, comment: "A-roll: trabalho real do criador" },
            { time: 67, comment: "Fecho: nao e so arte, e fluxo" }
        ]
    },
    {
        name: "SEQ_2026-04-22_DEEPFAKE_SEGURANCA",
        placements: [
            { file: "youtube-likeness-detection-mobile-full.png", time: 6 },
            { file: "openai-system-card-mobile-full.png", time: 15 },
            { file: "ap-teens-deepfake-victims-browser-mobile.png", time: 39 },
            { file: "wired-deepfake-schools-browser-mobile.png", time: 52 }
        ],
        markers: [
            { time: 0, comment: "A-roll: hook - detector de rosto no YouTube" },
            { time: 6, comment: "Print: YouTube likeness detection" },
            { time: 15, comment: "Print: OpenAI system card e risco de deepfake" },
            { time: 26, comment: "A-roll: seguranca virou pauta central" },
            { time: 39, comment: "Print: caso real AP em escola" },
            { time: 52, comment: "Print: analise WIRED sobre crise nas escolas" },
            { time: 63, comment: "Fecho: crise de confianca" }
        ]
    },
    {
        name: "SEQ_2026-04-22_BENCHMARK_MJ_GPT_CLAUDE",
        placements: [
            { file: "midjourney-version-mobile-full.png", time: 7 },
            { file: "openai-images-2-0-mobile-full.png", time: 18 },
            { file: "claude-support-mobile-full.png", time: 31 }
        ],
        markers: [
            { time: 0, comment: "A-roll: hook - mesma ideia, tres papeis" },
            { time: 7, comment: "SUBSTITUIR: imagem base Midjourney + print da doc" },
            { time: 18, comment: "SUBSTITUIR: resultado GPT Images + print OpenAI" },
            { time: 31, comment: "Print: suporte do Claude dizendo que nao gera foto como os outros" },
            { time: 42, comment: "A-roll: Claude entra como leitura critica do prompt" },
            { time: 57, comment: "Plot twist: Midjourney ainda ganhou no look" },
            { time: 67, comment: "Fecho: GPT util, Midjourney visual, Claude leitura" }
        ]
    }
];

function log(message) {
    var logFile = new File(LOG_PATH);
    logFile.open("a");
    logFile.writeln(message);
    logFile.close();
}

function resetLog() {
    var logFile = new File(LOG_PATH);
    logFile.open("w");
    logFile.writeln("Setup started");
    logFile.close();
}

function sleep(ms) {
    $.sleep(ms);
}

function getOrCreateProject() {
    var projectFile = new File(PROJECT_PATH);
    if (projectFile.exists) {
        log("Opening existing project");
        app.openDocument(PROJECT_PATH, true, true, true, true);
    } else {
        log("Creating new project");
        app.newProject(PROJECT_PATH);
    }
    sleep(1500);
    return app.project;
}

function getSequenceByName(name) {
    for (var i = 0; i < app.project.sequences.numSequences; i++) {
        var seq = app.project.sequences[i];
        if (seq && seq.name === name) {
            return seq;
        }
    }
    return null;
}

function getOrCreateSequence(name) {
    var existing = getSequenceByName(name);
    if (existing) {
        log("Sequence exists: " + name);
        return existing;
    }
    log("Creating sequence: " + name);
    var created = app.project.newSequence(name, PRESET_PATH);
    sleep(500);
    return created;
}

function findProjectItemByName(parentItem, fileName) {
    if (!parentItem || !parentItem.children) {
        return null;
    }
    for (var i = 0; i < parentItem.children.numItems; i++) {
        var child = parentItem.children[i];
        if (!child) {
            continue;
        }
        if (child.name === fileName) {
            return child;
        }
        var nested = findProjectItemByName(child, fileName);
        if (nested) {
            return nested;
        }
    }
    return null;
}

function getOrCreateBin(parentBin, name) {
    for (var i = 0; i < parentBin.children.numItems; i++) {
        var child = parentBin.children[i];
        if (child && child.name === name) {
            return child;
        }
    }
    return parentBin.createBin(name);
}

function importPrints(bin) {
    var toImport = [];
    for (var i = 0; i < PRINTS.length; i++) {
        var path = PRINTS[i];
        var name = path.split("/").pop();
        if (!findProjectItemByName(app.project.rootItem, name)) {
            toImport.push(path);
        }
    }
    if (toImport.length > 0) {
        log("Importing " + toImport.length + " print files");
        app.project.importFiles(toImport, true, bin, false);
        sleep(2000);
    } else {
        log("All prints already imported");
    }
}

function addMarker(sequence, seconds, comment) {
    var marker = sequence.markers.createMarker(seconds);
    if (marker) {
        try {
            marker.name = comment;
        } catch (e) {}
        try {
            marker.comments = comment;
        } catch (e2) {}
    }
}

function placePrint(sequence, fileName, seconds) {
    var item = findProjectItemByName(app.project.rootItem, fileName);
    if (!item) {
        log("Missing project item for placement: " + fileName);
        return;
    }
    var videoTrackIndex = 0;
    try {
        var numTracks = sequence.videoTracks.numTracks;
        if (numTracks > 2) {
            videoTrackIndex = 2;
        } else if (numTracks > 1) {
            videoTrackIndex = 1;
        }
    } catch (e) {}
    log("Placing " + fileName + " at " + seconds + "s on V" + (videoTrackIndex + 1));
    sequence.overwriteClip(item, seconds.toString(), videoTrackIndex, 0);
    sleep(200);
}

function buildSequence(definition) {
    var seq = getOrCreateSequence(definition.name);
    sleep(400);
    for (var i = 0; i < definition.markers.length; i++) {
        var marker = definition.markers[i];
        addMarker(seq, marker.time, marker.comment);
    }
    for (var j = 0; j < definition.placements.length; j++) {
        var placement = definition.placements[j];
        placePrint(seq, placement.file, placement.time);
    }
    return seq;
}

try {
    resetLog();
    var project = getOrCreateProject();
    log("Project path: " + PROJECT_PATH);
    var root = project.rootItem;
    var printsBin = getOrCreateBin(root, "PRINTS_2026_04_22");
    importPrints(printsBin);

    var openedSequence = null;
    for (var s = 0; s < SEQUENCES.length; s++) {
        var sequence = buildSequence(SEQUENCES[s]);
        openedSequence = sequence;
    }

    if (openedSequence) {
        project.openSequence(openedSequence.sequenceID);
    }

    project.save();
    log("Setup complete");
} catch (error) {
    log("ERROR: " + error);
}
