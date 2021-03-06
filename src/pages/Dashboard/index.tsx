import React from 'react'
import { Container } from 'react-grid-system'

import SectionTitle from '../../components/SectionHeader'
import Header from '../../components/Header'
import Card from './PredictCard'
function DashBoard() {
  
  return (
    <Container>
      <Header primary="Prediction" />
      <SectionTitle title="Trading Volume Prediction"/>

      <Card />
    </Container>
  )
}

export default DashBoard
