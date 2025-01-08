import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Download, Edit, IdCard } from 'lucide-react'
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";

import { Employee } from "@/types/Employee.types"
import { Loader } from "@/components/loader";
import { Button } from "../ui/button";
import { logo_full_black } from "@/Assets";
import { forwardRef, useRef } from "react";
import { toSnakeCase } from "@/utils/utils";

export function EmployeeHeader({ employee, isLoading }: { employee: Employee, isLoading: boolean }) {

    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQR = () => {
        const filename = `${toSnakeCase(employee?.name)}_${employee?.dni}.jpeg`;
        htmlToImage.toJpeg(qrRef.current)
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.href = dataUrl;
                link.download = filename;
                link.click();
            }).catch(function (error) {
                console.error('ERROR', error);
            });
    };

    const QR = forwardRef<HTMLDivElement, {}>((props, ref) => {
        if (isLoading || !employee) return null;
        return (
            <div ref={ref} className="w-[300px] p-4 bg-white">
                <div className="flex flex-col gap-4 border rounded-lg shadow-md p-6">
                    <img src={logo_full_black} className="w-full" />
                    <QRCode value={employee?.dni} level="M" className="aspect-square w-full" />
                    <div className="flex flex-col">
                        <label className="font-semibold text-xl">{employee?.name}</label>
                        <label className="font-normal text-lg">DNI: {employee?.dni}</label>
                    </div>
                </div>
            </div>
        );
    });

    return (<>
        <Card>
            {isLoading ?
                <div className="p-4 flex justify-center items-center">
                    <Loader />
                </div>
                : (<>
                    <CardContent className="flex flex-row items-center gap-4 pt-6">
                        <div className="flex flex-row w-full justify-between">

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2">
                                    <CardTitle className="text-2xl">{employee?.name}</CardTitle>
                                    <Link to={`/employee/${employee?.id}/edit`} className="flex items-center gap-1"><Edit size={16} /><span>Editar</span></Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IdCard className="h-4 w-4 opacity-70" /> <span>DNI: {employee?.dni}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-32">
                                <QRCode value={employee?.dni} level="M" className="w-full h-full" />
                                <Button variant="outline" onClick={downloadQR}><Download />Descargar QR</Button>
                            </div>

                        </div>
                    </CardContent>
                </>
                )}
        </Card>
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
            <QR ref={qrRef} />
        </div>
    </>
    );
}