import G6 from '@antv/g6';

const data = {
    nodes: [
        {
            id: 'node1',
            label: 'Circle1',
            x: 150,
            y: 150,
        },
        {
            id: 'node2',
            label: 'Circle2',
            x: 400,
            y: 150,
        },
    ],
    edges: [
        {
            source: 'node1',
            target: 'node2',
        },
    ],
};

// 实例化 minimap 插件
const minimap = new G6.Minimap({
    size: [100, 100],
    className: 'minimap',
    type: 'delegate',
});

// 实例化 Image Minimap 插件
const imageMinimap = new G6.ImageMinimap({
    width: 200,
    graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ'
});

// 实例化 grid 插件
const grid = new G6.Grid();

const graph = new G6.Graph({
    container: 'container',
    width: 800,
    height: 600,
    // fitView: true,
    // fitViewPadding: [20, 40, 50, 20],
    defaultNode: {
        size: 30,
        labelCfg: {
            style: {
                fill: '#fff',
            },
        },
    },
    defaultEdge: {
        labelCfg: {
            autoRotate: true,
        },
    },
    layout: {
        // Object，可选，布局的方法及其配置项，默认为 random 布局。
        type: 'force', // 指定为力导向布局
        preventOverlap: true, // 防止节点重叠
        linkDistance: 100, // 指定边距离为100
        // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
    },
    modes: {
        default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            {
                type: 'tooltip', // 节点提示框
                formatText(model) {
                    // 提示框文本内容
                    const text = 'label: ' + model.label + '<br/> class: ' + model.class;
                    return text;
                },
            },
            {
                type: 'edge-tooltip', // 边提示框
                formatText(model) {
                    // 边提示框文本内容
                    const text =
                        'source: ' +
                        model.source +
                        '<br/> target: ' +
                        model.target +
                        '<br/> weight: ' +
                        model.weight;
                    return text;
                },
            },

        ], // 允许拖拽画布、放缩画布、拖拽节点
    },
    // 节点不同状态下的样式集合
    nodeStateStyles: {
        // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
        hover: {
            fill: 'lightsteelblue',
        },
        // 鼠标点击节点，即 click 状态为 true 时的样式
        click: {
            stroke: '#000',
            lineWidth: 3,
        },
    },
    // 边不同状态下的样式集合
    edgeStateStyles: {
        // 鼠标点击边，即 click 状态为 true 时的样式
        click: {
            stroke: 'steelblue',
        },
    },
    plugins: [minimap, grid], // 将 grid 实例配置到图上
    // plugins: [minimap], // 将 minimap 实例配置到图上
    // plugins: [imageMinimap], // 配置 imageMinimap 插件
    // plugins: [grid], // 将 grid 实例配置到图上
    animate: true, // Boolean，可选，全局变化时否使用动画过渡
});

const main = async () => {
    const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
    );
    const remoteData = await response.json();
    const nodes = remoteData.nodes;
    const edges = remoteData.edges;
    nodes.forEach((node) => {
        if (!node.style) {
            node.style = {};
        }
        node.style.lineWidth = 1;
        node.style.stroke = '#666';
        node.style.fill = 'steelblue';
        switch (node.class) {
            case 'c0': {
                node.type = 'circle';
                break;
            }
            case 'c1': {
                node.type = 'rect';
                node.size = [35, 20];
                break;
            }
            case 'c2': {
                node.type = 'ellipse';
                node.size = [35, 20];
                break;
            }
        }
    });
    edges.forEach((edge) => {
        if (!edge.style) {
            edge.style = {};
        }
        edge.style.lineWidth = edge.weight;
        edge.style.opacity = 0.6;
        edge.style.stroke = 'grey';
    });

    graph.data(remoteData);
    graph.render();

    // 鼠标进入节点
    graph.on('node:mouseenter', (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        if (nodeItem) graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
    });

    // 鼠标离开节点
    graph.on('node:mouseleave', (e) => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
        if (nodeItem) graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
    });

    // 点击节点
    graph.on('node:click', (e) => {
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = graph.findAllByState('node', 'click');
        clickNodes.forEach((cn) => {
            graph.setItemState(cn, 'click', false);
        });
        const nodeItem = e.item; // 获取被点击的节点元素对象
        if (nodeItem) graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
    });

    // 点击边
    graph.on('edge:click', (e) => {
        // 先将所有当前是 click 状态的边置为非 click 状态
        const clickEdges = graph.findAllByState('edge', 'click');
        clickEdges.forEach((ce) => {
            graph.setItemState(ce, 'click', false);
        });
        const edgeItem = e.item; // 获取被点击的边元素对象
        if (edgeItem) graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
    });

    // // 一些主画布更新操作
    // let img = 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ';
    // imageMinimap.updateGraphImg(img); // 使用新的图片（用户自己生成）替换 minimap 图片

};
main();

