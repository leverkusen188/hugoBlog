//
//  NativeView.m
//  RNWithNative
//
//  Created by jianghui liu on 2022/6/22.
//

#import "NativeView.h"
#import <CoreLocation/CoreLocation.h>

@interface MyUITextField : UITextField
@property (nonatomic, copy) RCTBubblingEventBlock onHello;

@end
@implementation MyUITextField
@end


@interface NativeView ()
@property (nonatomic, strong) MyUITextField * ff;

@end

@implementation NativeView
RCT_EXPORT_MODULE(NativeView)
RCT_EXPORT_VIEW_PROPERTY(userInteractionEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onHello, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(frameTest, CGRect, UITextField)
{
    CGRect rect = [RCTConvert CGRect:json];
    view.frame = rect;
}
- (UITextField*)view {
    MyUITextField * field = [MyUITextField new];
    field.text = @"BBBB";
    field.textColor = [UIColor blueColor];
    field.textAlignment = UITextAlignmentCenter;
    UITapGestureRecognizer * tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tapped:)];
    [field addGestureRecognizer:tap];
    self.ff = field;
    return field;
}

- (void)tapped:(UITapGestureRecognizer*)gesture {
    dispatch_async(dispatch_get_main_queue(), ^{
        static BOOL b = YES;
        self.ff.backgroundColor = b ? [UIColor blackColor] : [UIColor yellowColor];
        b = !b;
        
        MyUITextField * field = gesture.view;
        if (field.onHello) {
            field.onHello(@{@"first":@(12)});
        }
    });
    
}

@end
