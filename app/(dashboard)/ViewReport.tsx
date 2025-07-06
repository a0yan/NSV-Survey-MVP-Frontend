import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React from 'react'

function ViewReport() {
  return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>View Report</ThemedText>
        </ThemedView>
      )
}

export default ViewReport
