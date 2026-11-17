// Public assets use root-style paths in Markdown; prefix them for project Pages.
export default function remarkBase({ base }) {
  return tree => {
    function visit(node) {
      if ((node.type === 'image' || node.type === 'link' || node.type === 'definition') && node.url?.startsWith('/') && !node.url.startsWith('//')) {
        node.url = `${base}${node.url}`;
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
