<template>
  <div class="h-full">
    <div id="bpmn-canvas" class="h-full"></div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import BpmnModeler from 'bpmn-js/lib/Modeler';
  import activitiModdleDescriptor from 'activiti-bpmn-moddle/resources/activiti.json';
  import DefaultEmptyXML from './components/defaultEmpty';

  import 'bpmn-js/dist/assets/diagram-js.css';
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

  let bpmnModeler = null;

  onMounted(() => {
    initDiagram();
  });

  async function initDiagram() {
    bpmnModeler = new BpmnModeler({
      container: '#bpmn-canvas',
      moddleExtensions: {
        activiti: activitiModdleDescriptor,
      },
    });
    try {
      await bpmnModeler.importXML(DefaultEmptyXML());
    } catch (err) {
      console.log('err', err);
    }
  }
</script>

<style lang="less" scoped></style>
