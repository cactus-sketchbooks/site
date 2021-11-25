import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';


function Clients() {
    return (
        <div>
            <Header />
            <section id="clients-body">
                <nav className="clientInfos">
                    <header>
                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxANEA8OEBAPDhIQDxANEhAODxMODhANFhUWFhYRFRMYHSggGBomGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZHxkrKysrLSsrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOYA2wMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAgMEB//EADgQAQACAAIHBgQEBAcAAAAAAAABAgMRBAUSEyFBUgYxUWFxkiJykcEygdHhI0KhsTNDU2KCorL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8AsgDSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPXq/QLY88OFY77faPGQebDw5vOzWJtM8ojOUrouor2ym87PlHxWT2r9X0w4yrGUc7d9rT5ykaVivdw/uioTB7P4cd9bW+a2X9HojUeH/p0+spXaNpBDYuoMOf8vL5bTCO0ns/l+C0xPhePute0xOU8JylaPn2k6LfCnK9ZjwnvrPpLgv2k6LFomMomJ76zxhV9aao2M74ec15175r6eMCIkBQAAAAAAAAAAAAAAAB6NB0Wce8UjhHfaemvOVswMGtIilYyiODx6m0XdYcTP4r/FPpyhIIPXHDgztOUWNpFddo2nLaNoHXaNpy2jaB12nlxo4+vF12nLEnOQVrXer93O8rHw2njHTb9JRS6Y2FF62pPGLRlKn6RhTh2tSe+s5evmqOYCgAAAAAAAAAAAA76Fg7zEpTxtGfpzcElqCueNn4VtP2BZYZYZQInJttNQG+0bTmA6bRtOYDabNWQGFf7RYOV63j+aMp9YWFE9o654dZ8L/3gFeYBQAAAAAAAAAAAASnZ6f4s+dLfZFvZqjE2Mak+M7P1Ba2WGUAAAAAAAABF9oZ/hR88fdKIPtJif4dPObfYEGAoAAAAAAAAAAAAMxOUxMd8TmwAuOh48YtK3jnHHynm7q3qPTd3bd2nKt54Tyrf9JWNBkAAAAAAAGFT1ppG9xbWjuj4Y9I5prXenbumxWfjvH51pzn81aAAUAAAAAAAAAAAAAAE7qjWsTlh4k5T3VvPPymfugnTBwbYk7NazafIF0Hg1Xo+Lh1yxLxaOVe+a/8nvQAAAAHi1jrCuBGXfeY4V+8+T0aRW81mKWiluVprtZfkq2m6Hi4czN4mc+O3ntRM+oOGNize02tOczOcy1YFAAAAAAAAAAAAAAAE3qjVWeWJiR51pP/AKkHn1dqm2Lle/wU/wC1vTwjzWDAwK4cbNaxWPLn6ujKAAAAAAAxMRPCeMTy5MgIbWGpYnO2Fwnv2OU+nhKBtWYmYmJiY4TExlMSuzw6z1dXHjOOF47p8fKQVYbYlJpM1tGUxwmJaqAAAAAAAAAAAPVq/RJxrxXuiONp8K/ryB7dSau253t4+GJ+GJ/mnx9Fha0rFYiIjKIjKIjlDZAAAAAAAAAAAABHa31fGNXarwvWOH+6PBWZhd1f19oWzO+r3WnK0eFuVvSQQ4CgAAAAAAAAtOptE3WHEz+K/wAU+nKEFqrR97i1ie6Pit6QtiAAAAAAAAAAAAAAA542HF6zWeMWiYl0AUzScGcO9qT31nL1jlLknO0ejfhxY+S32lBqAAAAAADLACw9ncDKlsSe+9so+WP3z+iXcdDwt3h0p01iPz5/1dkAAAAAAAAAAAAAAAAHDTcDe4d6eNZy+bkpy7qlrTC2MbEjlNtqPS3EHlAUAAAAHfQsPbxcOvjePp3uD36kiN9WZmIyi08eHIFoZabyvVX6wbyvVX3Qg3Gm8r1V90G8r1V90A3Gm8r1V90G8r1V90A3Gm8r1V90G8r1V90A3Gm8r1V90G8r1V90A3Gm8r1V90G8r1V90A3Gm8r1V90G8r1V90A3Gm8r1V90G8r1V90A3Gm8r1V90G8r1V90A3V7tHh5XpbqrMfSf3T28r1V90IjtFMTWkxMTlaY4TE8JgECAoAAAAAAZGQAZGQAZGQAZGQAZGQAZGQAZGQAZGQAZGQAZAAAAAA//9k=" alt=""></img>
                        <h1>NOME DO CLIENTE</h1>
                    </header>
                    <article>
                        <aside className="clientWork">
                            <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</h2>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADp8Q9+nG9anuOrfAAAAABJRU5ErkJggg==" alt=""></img>
                        </aside>
                        <aside className="clientWork">
                            <h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English</h3>
                        </aside>
                    </article>
                </nav>
            </section >
            <Footer />
        </div>
    )
} export default Clients;