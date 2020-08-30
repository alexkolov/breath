export class Program {

  constructor(phases, timeTotal) {
    if (phases.length < 2) {
      throw new Error('Needs at least two phases!');
    }
    this.phases = phases;
    this.phaseIndex = -1;
    this.timeTotal = timeTotal;
    this.timeElapsed = 0;
  }

  get isActive() {
    return this.phaseIndex > -1;
  }

  get currentPhase() {
    return this.isActive
      ? this.phases[this.phaseIndex]
      : null;
  }

  get nextPhaseIndex() {
    return this.phaseIndex + 1 < this.phases.length
      ? this.phaseIndex + 1
      : 0;
  }

  get timeStats() {
    return {
      timeTotal: this.timeTotal,
      timeElapsed: this.timeElapsed
    }
  }

  get state() {
    return {
      isActive: this.isActive,
      currentPhase: this.currentPhase,
      timeStats: this.timeStats
    }
  }

  stop() {
    this.timeElapsed = 0;
    this.phaseIndex = -1;
  }

  forward() {
    if (this.timeElapsed >= this.timeTotal) {
      this.stop();
      return false;
    }

    this.phaseIndex = this.nextPhaseIndex;

    if (this.isActive) {
      this.timeElapsed += this.currentPhase.length;
    }

    return true;
  }
}
