export interface FileTree {
  name: string
  path?: string
  children?: FileTree[]
}

export function createFileTreeForRegistryItemFiles(files: string[]): FileTree[] {
  const root: FileTree[] = []

  files.forEach((path) => {
    const parts = path.split("/")
    let currentLevel = root

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1
      let existingNode = currentLevel.find((node) => node.name === part)

      if (!existingNode) {
        existingNode = { name: part }
        if (isFile) {
          existingNode.path = path
        } else {
          existingNode.children = []
        }
        currentLevel.push(existingNode)
      }

      if (!isFile) {
        currentLevel = existingNode.children!
      }
    })
  })

  return root
}
