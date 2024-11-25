import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { User, Lock } from "lucide-react"
import './loginpage.css'

const LoginPage = ({ setCurrentUser, allUsers, setLogin }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        const findUser = allUsers.reduce((fu, user) => {
            return data.id == user.id && data.password == user.pw ? user : fu;
        }, {});
        
        if (Object.keys(findUser).length === 0) {
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            reset();
            return;
        }

        setCurrentUser(findUser);
        setLogin(true);
        navigate("/");
    };

    // return (
    //     <div>
    //         <img src='/myLogo.png' style={{width:"1000px"}}></img>
    //     </div>
    // )
    return (
        <div>        
            
        <div className="login-container">
      
            <div className="login-wrapper">
            
                <div className="logo-wrapper">
                    {/* 계속에러가 나서 이미지만 따로 스타일을 주겠음 */}
                <img
                        src="/assets/images/logo/myLogo.png"
                        alt="ReLife"
                        className="logo-image"
                        style={{width:"100%", height:"auto",padding:"0 1.3rem 0 1.3rem"}}
                    />
                    <div className="logo-line"></div>
                    <h2 className="login-title">Welcome Back!</h2>
                    <p className="login-subtitle">리마스터 라이프에 오신 것을 환영합니다</p>
                </div>
                
                <Card className="login-card">
                    <CardContent className="card-content">
                        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                            <div className="input-group">
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <User className="icon" />
                                    </div>
                                    <Input
                                        {...register("id", { 
                                            required: "아이디를 입력해주세요",
                                            // minLength: {
                                            //     value: 4,
                                            //     message: "아이디는 최소 4자 이상이어야 합니다"
                                            // }
                                        })}
                                        type="text"
                                        placeholder="아이디"
                                        className="input-field"
                                    />
                                    {errors.id && (
                                        <p className="error-message">{errors.id.message}</p>
                                    )}
                                </div>

                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <Lock className="icon" />
                                    </div>
                                    <Input
                                        {...register("password", {
                                            required: "비밀번호를 입력해주세요",
                                        })}
                                        type="password"
                                        placeholder="비밀번호"
                                        className="input-field"
                                    />
                                    {errors.password && (
                                        <p className="error-message">{errors.password.message}</p>
                                    )}
                                </div>
                            </div>

    

                            <div className="button-group">
                                <Button type="submit" className="login-button">
                                    로그인
                                </Button>

                                <div className="divider">
                                    <span>또는</span>
                                </div>

                                <Button 
                                    type="button"
                                    variant="outline" 
                                    className="signup-button"
                                    onClick={() => navigate("/signup")}
                                >
                                    회원가입
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
        </div>

    );
};

export default LoginPage;