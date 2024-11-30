import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import "./signup.css";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  KeyRound,
  UserCircle,
  Users,
  Home,
  Ruler,
  Scale,
  Phone,
  PhoneCall,
} from "lucide-react";
import ChangeConfirmModal from "../../components/ChangeConfirm/ChangeConfirmModal";

let SignUpPage = ({ setallUsers, allUsers }) => {
  const navigate = useNavigate();
  const [currentStep, setStep] = useState(1);
  const [newUser, setNewUser] = useState({
    before_programs: [],
    programs: [],
    l_support: [],
    t_support: [],
    schedule: [],
    job: [],
    my_menu: [
      {
        id: "1",
        name: "프로그램",
        img: "/assets/images/sidebar/program-icon.png",
        route: "/program",
        keywords: ["프로그램", "프로그램으로 이동해주세요", "program"],
      },
      {
        id: "2",
        name: "활동지원",
        img: "/assets/images/sidebar/support-icon.png",
        route: "/activity",
        keywords: ["활동 지원", "활동지원", "activity"],
      },
      {
        id: "3",
        name: "공지사항",
        img: "/assets/images/sidebar/notice-icon.png",
        route: "/notice",
        keywords: ["공지 사항", "공지", "notice"],
      },
    ],
    rest_menu: [
      {
        id: "4",
        name: "일정관리",
        img: "/assets/images/sidebar/calendar-icon.png",
        route: "/schedule",
        keywords: ["일정관리", "캘린더", "calendar"],
      },
      {
        id: "5",
        name: "일자리",
        img: "/assets/images/sidebar/job-icon.png",
        route: "/jobs",
        keywords: ["일자리", "구인", "jobs"],
      },
      {
        id: "6",
        name: "마이페이지",
        img: "/assets/images/sidebar/mypage-icon.png",
        route: "/mypage",
        keywords: ["마이페이지", "마이 페이지", "mypage"],
      },
    ],
  });
  const [stepThreeState, setStepThreeState] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onSubmit", // 폼 제출시에만 유효성 검사
  });
  // password 필드의 값을 실시간으로 관찰
  //실시간으로 관찰해서 같은값을 작성했는지 확인
  const watchPassword = watch("password");

  const onSubmit = (data) => {
    if (currentStep === 1) {
      setNewUser((prev) => ({
        ...prev,
        id: data.id,
        pw: data.password,
      }));
      setStep(2);
      reset(); // 폼 초기화
    } else if (currentStep === 2) {
      setNewUser((prev) => ({
        ...prev,
        name: data.name,
        gender: data.gender,
        address: data.address,
        height: parseInt(data.height),
        weight: parseInt(data.weight),
        phone_number: data.phone_number,
        emergency_phone_number: data.emergency_phone_number,
      }));
      setStep(3);
      reset(); // 폼 초기화
    } else if (currentStep === 3) {
      if (selectedDisabilities.length === 0) {
        setStepThreeState("장애 유형을 선택해주세요.");
        return;
      }

      if (
        Object.keys(disabilityGrades).length !== selectedDisabilities.length
      ) {
        setStepThreeState("모든 장애 유형의 등급을 선택해주세요.");
        return;
      }

      console.log("최신 data " + selectedDisabilities + disabilityGrades);
      const finalNewUser = {
        ...newUser,
        disability_type: selectedDisabilities,
        disability_grade: disabilityGrades,
      };
      setNewUser(finalNewUser);
      const newAllUsers = [...allUsers, finalNewUser];
      setallUsers(newAllUsers);
      console.log(newAllUsers);

      setIsConfirmModalOpen(true);
    }
  };

  const [selectedDisabilities, setSelectedDisabilities] = useState([]);
  const [disabilityGrades, setDisabilityGrades] = useState({});
  //selectedDisabilities는 배열이고
  //["장애유형","장애유형"]을가지고 있다.

  //disabilityGrades은 객체인데, 아래와같은 유형이다.
  //{
  //     "지적장애": "1",
  //     "시각장애": "2",
  //     "언어장애": "3"
  // }

  // 장애 유형 목록
  const disabilityTypes = [
    "지적장애",
    "지체장애",
    "뇌병변장애",
    "시각장애",
    "청각장애",
    "언어장애",
    "자폐성장애",
    "신장장애",
    "심장장애",
    "호흡기",
    "간장애",
    "안면장애",
    "장루요루",
    "뇌전증",
    "상이등급",
  ];

  // 장애 유형 선택 핸들러
  // 이때 prev는 selectedDisabilities의 이전상태를 의미한다.
  // 물론 더 쉽게 현재 selectedDisabilities에서 type이 있는지 확인하고
  // 업데이트 시키거나 삭제할 수도 있다!!
  const handleDisabilitySelect = (type) => {
    setSelectedDisabilities((prev) => {
      if (prev.includes(type)) {
        // 선택 해제 시 해당 등급도 삭제
        const newGrades = { ...disabilityGrades };
        delete newGrades[type];
        setDisabilityGrades(newGrades);
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  // 등급 선택 핸들러
  const handleGradeSelect = (type, grade) => {
    setDisabilityGrades((prev) => ({
      ...prev,
      [type]: grade,
    }));
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-logo-wrapper">
          <img
            src="/assets/images/logo/mylogo.png"
            alt="ReLife"
            className="signup-logo-img"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="content-wrapper">
          <Card className="signup-card">
            <CardContent className="signup-card-content p-6">
              <div className="flex flex-col h-full">
                <div style={{ display: "flex", gap: "1rem" }}>
                  {[1, 2, 3].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className="relative">
                        <div
                          className={`
                                                    w-12 h-12 rounded-full flex items-center justify-center
                                                    font-medium text-lg transition-all duration-200
                                                    ${
                                                      currentStep === step
                                                        ? "bg-blue-500 text-white"
                                                        : currentStep > step
                                                        ? "bg-blue-200 text-blue-800"
                                                        : "bg-blue-100 text-gray-600"
                                                    }
                                                `}
                        >
                          {step}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex-1 overflow-y-auto">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 mt-6"
                  >
                    {currentStep === 1 ? (
                      <>
                        <div className="relative">
                          <div className="absolute left-3 top-3">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            {...register("id", {
                              required: "아이디를 입력해주세요",
                              minLength: {
                                value: 6,
                                message: "아이디는 6글자 이상이어야 합니다",
                              },
                            })}
                            className="pl-10"
                            placeholder="아이디"
                          />
                          {errors.id && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.id.message}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <div className="absolute left-3 top-3">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            type="password"
                            {...register("password", {
                              required: "비밀번호를 입력해주세요",
                              minLength: {
                                value: 6,
                                message: "비밀번호는 6글자 이상이어야 합니다",
                              },
                              pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                message: "영문과 숫자를 조합하여 입력해주세요",
                              },
                            })}
                            className="pl-10"
                            placeholder="비밀번호"
                          />
                          {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.password.message}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <div className="absolute left-3 top-3">
                            <KeyRound className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            type="password"
                            {...register("passwordConfirm", {
                              required: "비밀번호를 다시 입력해주세요",
                              // 현재 입력된 값(value)이 위에서 입력한 비밀번호(watchPassword)와
                              // 같은지 확인합니다
                              validate: (value) => {
                                if (value !== watchPassword) {
                                  return "비밀번호가 일치하지 않습니다";
                                }
                                return true;
                              },
                            })}
                            className="pl-10"
                            placeholder="비밀번호 확인"
                          />
                          {errors.passwordConfirm && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.passwordConfirm.message}
                            </p>
                          )}
                        </div>
                        <div style={{ height: "150px" }}></div>
                        <div className="sticky bottom-0 bg-cadetblue pt-4 flex justify-end">
                          <Button
                            type="submit"
                            className="w-40 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                          >
                            다음
                          </Button>
                        </div>
                      </>
                    ) : currentStep === 2 ? (
                      <>
                        <div className="space-y-4">
                          {" "}
                          {/* 간격 통일을 위한 wrapper */}
                          <div className="relative">
                            <div className="absolute left-3 top-3">
                              <UserCircle className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              {...register("name", {
                                required: "이름을 입력해주세요",
                              })}
                              className="pl-10 w-full h-11" // 크기 통일
                              placeholder="이름"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                          <div className="relative">
                            <div className="absolute left-3 top-0.8">
                              <Users className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="pl-10 flex items-center  gap-6">
                              <label className="whitespace-nowrap flex items-center gap-2">
                                <input
                                  type="radio"
                                  {...register("gender", {
                                    required: "성별을 선택해주세요",
                                  })}
                                  value="남"
                                  className="w-4 h-4"
                                />
                                <span className="inline-block">남자</span>
                              </label>

                              <label className="whitespace-nowrap flex items-center gap-2">
                                <input
                                  type="radio"
                                  {...register("gender")}
                                  value="여"
                                  className="w-4 h-4"
                                />
                                <span className="inline-block">여자</span>
                              </label>
                            </div>
                            {errors.gender && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.gender.message}
                              </p>
                            )}
                          </div>
                          <div className="relative">
                            <div className="absolute left-3 top-3">
                              <Home className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              {...register("address", {
                                required: "주소를 입력해주세요",
                              })}
                              className="pl-10 w-full h-11"
                              placeholder="주소"
                            />
                            {errors.address && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.address.message}
                              </p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 max-w-[500px]">
                            <div className="relative">
                              <div className="absolute left-3 top-3">
                                <Ruler className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                type="number"
                                {...register("height", {
                                  required: "키를 입력해주세요",
                                  min: {
                                    value: 100,
                                    message: "올바른 키를 입력해주세요",
                                  },
                                  max: {
                                    value: 250,
                                    message: "올바른 키를 입력해주세요",
                                  },
                                })}
                                className="pl-10 pr-12 w-full h-11"
                                placeholder="키"
                              />
                              <span className="absolute right-3 top-3 text-gray-400">
                                cm
                              </span>
                              {errors.height && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.height.message}
                                </p>
                              )}
                            </div>

                            <div className="relative">
                              <div className="absolute left-3 top-3">
                                <Scale className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                type="number"
                                {...register("weight", {
                                  required: "몸무게를 입력해주세요",
                                  min: {
                                    value: 30,
                                    message: "올바른 몸무게를 입력해주세요",
                                  },
                                  max: {
                                    value: 200,
                                    message: "올바른 몸무게를 입력해주세요",
                                  },
                                })}
                                className="pl-10 pr-12 w-full h-11"
                                placeholder="몸무게"
                              />
                              <span className="absolute right-3 top-3 text-gray-400">
                                kg
                              </span>
                              {errors.weight && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.weight.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="relative">
                            <div className="absolute left-3 top-3">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              {...register("phone_number", {
                                required: "전화번호를 입력해주세요",
                                pattern: {
                                  value:
                                    /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                                  message: "올바른 전화번호 형식이 아닙니다",
                                },
                              })}
                              className="pl-10 w-full h-11"
                              placeholder="전화번호 (01x-xxxx-xxxx)"
                            />
                            {errors.phone_number && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.phone_number.message}
                              </p>
                            )}
                          </div>
                          <div className="relative">
                            <div className="absolute left-3 top-3">
                              <PhoneCall className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              {...register("emergency_phone_number", {
                                required: "비상연락처를 입력해주세요",
                                pattern: {
                                  value:
                                    /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                                  message: "올바른 전화번호 형식이 아닙니다",
                                },
                              })}
                              className="pl-10 w-full h-11"
                              placeholder="비상연락처 (01x-xxxx-xxxx)"
                            />
                            {errors.emergency_phone_number && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.emergency_phone_number.message}
                              </p>
                            )}
                          </div>
                          <div className="sticky bottom-0 bg-cadetblue pt-4 flex justify-end">
                            <Button
                              type="submit"
                              className="w-40 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                            >
                              다음
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col flex-1">
                        <div className="space-y-4 flex-1">
                          {/* 장애 유형 선택 */}
                          <div className=" flex flex-wrap gap-4 p-4 border rounded-md">
                            {disabilityTypes.map((type) => (
                              <label
                                key={type}
                                className="flex items-center gap-2 min-w-fit"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedDisabilities.includes(type)}
                                  onChange={() => handleDisabilitySelect(type)}
                                  className="rounded border-gray-300 w-4 h-4"
                                />
                                <span className="inline-block">{type}</span>
                              </label>
                            ))}
                          </div>
                          <div style={{ color: "red" }}>{stepThreeState}</div>
                          {/* 선택된 장애 유형별 등급 선택 */}
                          {selectedDisabilities.length > 0 && (
                            <div className="space-y-4">
                              <label className="block text-sm font-medium text-gray-700">
                                장애 등급 선택
                              </label>
                              {selectedDisabilities.map((type) => (
                                <div
                                  key={type}
                                  className="flex items-center gap-4"
                                >
                                  <span className="w-24">{type}</span>
                                  <select
                                    value={disabilityGrades[type] || ""}
                                    onChange={(e) =>
                                      handleGradeSelect(type, e.target.value)
                                    }
                                    className="form-select rounded-md"
                                  >
                                    <option value="">등급 선택</option>
                                    {[1, 2, 3, 4, 5, 6].map((grade) => (
                                      <option key={grade} value={grade}>
                                        {grade}등급
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="sticky bottom-0 bg-cadetblue pt-4 flex justify-end">
                          <Button
                            type="submit"
                            className="w-40 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                          >
                            가입하기
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="illustration-wrapper">
            <img
              src="/assets/images/signup/signupbackground.jpg"
              alt="Signup Illustration"
              className="illustration-image"
            />
          </div>
        </div>
      </div>
      <ChangeConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        message="회원가입이 완료되었습니다."
      />
    </div>
  );
};

export default SignUpPage;
