# UnrealPinia
A plugin that abstracts communication between a Web UI browser (https://tracerinteractive.com/plugins/webui) and Unreal Engine.  This will take all items inside a Pinia state and create Pinia actions that will send data to Unreal and window.ue.interface listeners that will listen for updates from Unreal -- which will then update the Pinia state.
