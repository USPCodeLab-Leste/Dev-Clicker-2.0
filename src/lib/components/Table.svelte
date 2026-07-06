<div class="table"></div>

<style>
  .table {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    min-height: 150px;
    height: 33vh;
    background-color: var(--c6);
    background: radial-gradient(ellipse at 30% 100%, var(--c3) 0%, var(--c6) 100%);
    z-index: -5;
    transition: box-shadow .5s ease;

    @media (min-height: 900px) {
      min-height: 150px;
      height: 40vh;
    }

    @media (max-width: 800px) {
      position: absolute;
      left: 0;
      right: 0;
      top: 440px;
      height: 240px;
      min-height: auto;
      background: radial-gradient(ellipse at bottom, var(--c3) 0%, var(--c6) 100%);
    }

    @media (max-width: 470px) {
      top: calc(245px + 42vw);
      height: 55vw;
    }
  }

  :global(body.matrix) .table {
    overflow: hidden;
    opacity: .8;
    background-position: 0 100%;
    background: linear-gradient(to bottom, #00e20093 0%, 2.86624%, rgb(3, 110, 21) 5.73248%, 12.7389%, rgb(0, 64, 18) 19.7452%, 22.9299%, rgb(0, 56, 19) 26.1146%, 63.0573%, rgb(0, 47, 20) 100%);
  }

  :global(body.evil) .table {
    overflow: hidden;
    opacity: .8;
    background-position: 0 100%;
    background: linear-gradient(to bottom, #e2000093 0%, 2.86624%, rgb(110, 3, 3) 5.73248%, 12.7389%, rgb(64, 0, 0) 19.7452%, 22.9299%, rgb(56, 0, 0) 26.1146%, 63.0573%, rgb(47, 0, 0) 100%);
  }
</style>