

let skeletons = [1, 2, 3];

export const Skeleton = Extension.create({
  name: 'skeleton',
  addOptions() {
    return {
      ...this.parent?.(),
      skeletons: [...skeletons],
      button({ editor, extension, t }) {
        const skeletons = extension.options?.skeletons || [];
        const items: Item[] = [...skeletons].map(k => ({
          title: "skeletons",
          isActive: () => true,
          action: () => {
            insertCustomHTML(editor, String(k));
          },
          disabled: false,
          divider: false,
          default: false,
        }));
        const disabled = items.filter(k => k.disabled).length === items.length;
        return {
          component: SkeletonActionButton,
          componentProps: {
            editor,
            tooltip: "skeletons",
            disabled,
            items,
            maxHeight: 280,
          },
        }
      },
    }
  },
});

// Definisci la funzione che inserirà l'HTML personalizato
function insertCustomHTML(editor, skeletonId) {
  const customHTML = '<div class="custom-html">Custom HTML Content for Skeleton ' + skeletonId + '</div>';
  editor.chain().focus().insertContent(customHTML).run();
}
