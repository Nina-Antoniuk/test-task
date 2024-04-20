"use strict";

function FileTreeNode(nodeId, name, type) {
    const children = [];

    this.nodeId = nodeId;
    this.name = name;
    this.type = type;
    this.parentNode = null;

    this.setParent = function (parentNode) {
        this.parentNode = parentNode;
    };
    this.addChild = function (node) {
        if (this.type !== "DIRECTORY") {
            throw "Cannot add child node to a non-directory node";
        }
        children.push(node);
        node.setParent(this);
    };
    this.getChildren = function () {
        return children;
    };
}

function FileTree() {
    this.nodes = [];

    this.getRootNodes = function () {
        const result = [];
        for (let i = 0; i < this.nodes.length; i++) {
            if (!this.nodes[i].parentNode) {
                result.push(this.nodes[i]);
            }
        }
        return result;
    };
    this.findNodeById = function (nodeId) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].nodeId === nodeId) {
                return this.nodes[i];
            }
        }
        return null;
    };
    this.createNode = function (nodeId, name, type, parentNode) {
        const node = new FileTreeNode(nodeId, name, type);
        if (parentNode) {
            parentNode.addChild(node);
        }

        this.nodes.push(node);
    };
    this.createLinkedList = function (data) {
        const linkedList = [];

        for (let i = 0; i < data.length; i++) {
            if (!linkedList.length) {
                const firstElement = data.find((el) => !el.parentId);
                linkedList.push(firstElement);
                continue;
            }

            const prevEl = linkedList[linkedList.length - 1];
            const nextElement = data.find((el) => el.parentId === prevEl.id);
            linkedList.push(nextElement);
        }

        return linkedList;
    };
}

export function createFileTree(input) {
    const fileTree = new FileTree();

    const linkedList = fileTree.createLinkedList(input);

    for (const inputNode of linkedList) {
        var parentNode = inputNode.parentId
            ? fileTree.findNodeById(inputNode.parentId)
            : null;
        fileTree.createNode(
            inputNode.id,
            inputNode.name,
            inputNode.type,
            parentNode
        );
    }

    return fileTree;
}
