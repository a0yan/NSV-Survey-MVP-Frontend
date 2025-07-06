import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React from 'react'


function SelectProject() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Select Project</ThemedText>
    </ThemedView>
  )
}

export default SelectProject
